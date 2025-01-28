let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.slide');
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  // Déplace les slides
  document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
}

function moveSlide(step) {
  showSlide(currentSlide + step);
}



let currentMinecraftSlide = 0;

function showMinecraftSlide(index) {
    const slides = document.querySelectorAll('.carr-slide');
    if (index >= slides.length) {
        currentMinecraftSlide = 0;
    } else if (index < 0) {
        currentMinecraftSlide = slides.length - 1;
    } else {
        currentMinecraftSlide = index;
    }

    // Déplace les slides
    document.querySelector('.carrousel-slides').style.transform = `translateX(-${currentMinecraftSlide * 100}%)`;
}

function moveMinecraftSlide(step) {
    showMinecraftSlide(currentMinecraftSlide + step);
}

// Fonction pour afficher le popup
function showPopup() {
  document.getElementById('popup').style.display = 'flex';
}

// Fonction pour fermer le popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// popup cahcer à l'ouverture de la page
window.onload = function() {
  document.getElementById('popup').style.display = 'none';
};