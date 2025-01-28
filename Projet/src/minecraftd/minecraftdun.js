// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner toutes les vignettes
    const thumbnails = document.querySelectorAll('.thumbnail');
    // Sélectionner l'image principale
    const mainImage = document.getElementById('current-image');

    // Ajouter un événement de clic à chaque vignette
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Changer la source de l'image principale avec celle de la vignette cliquée
            mainImage.src = this.src;

            // Optionnel : changer le titre et la description selon la vignette
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            document.getElementById('game-title').textContent = title;
            document.getElementById('game-description').textContent = description;
        });
    });
});


// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('current-image');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    let currentIndex = 0; 

    function updateMainImage(index) {
        mainImage.src = thumbnails[index].src;
        const title = thumbnails[index].getAttribute('data-title');
        const description = thumbnails[index].getAttribute('data-description');
        document.getElementById('game-title').textContent = title;
        document.getElementById('game-description').textContent = description;
    }

    function showThumbnails(startIndex) {
        // Affiche les vignettes en boucle
        thumbnails.forEach((thumb, index) => {
            thumb.style.display = 'none'; // Cache toutes les vignettes
        });

        for (let i = 0; i < 5; i++) { // Affiche 5 vignettes
            const indexToShow = (startIndex + i) % thumbnails.length; 
            thumbnails[indexToShow].style.display = 'block'; // Affiche la vignette
        }
    }

    // Initialiser l'affichage
    showThumbnails(currentIndex);
    updateMainImage(currentIndex);

    // Événements de clic pour les flèches
    rightArrow.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % thumbnails.length; // Incrémente et boucle
        showThumbnails(currentIndex);
        updateMainImage(currentIndex);
    });

    leftArrow.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length; // Décrémente et boucle
        showThumbnails(currentIndex);
        updateMainImage(currentIndex);
    });

    // Ajouter un événement de clic à chaque vignette
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentIndex = index; // Met à jour l'index
            updateMainImage(currentIndex);
            showThumbnails(currentIndex); // Affiche les vignettes à partir de l'index actuel
        });
    });
});




  const list = document.querySelector(".list");
  const item = document.querySelector(".item");
  const itemWidth = item.offsetWidth;

  function handleClick(direction) {
    if(direction === "previous") {
      list.scrollBy({ left: -itemWidth, behavior: "smooth" });
    } else {
      list.scrollBy({ left: itemWidth, behavior: "smooth" });
    }
  }