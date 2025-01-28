function selectVersion(version) {
    // Réinitialiser toutes les boxes pour enlever la classe "selected"
    const versionBoxes = document.querySelectorAll('.version-box');
    versionBoxes.forEach(box => {
      box.classList.remove('selected');
    });
  
    // Ajouter la classe "selected" à la version sélectionnée
    const selectedBox = document.querySelector(`.version-box[onclick="selectVersion('${version}')"]`);
    selectedBox.classList.add('selected');

  
    // Changer la description en fonction de la version
    const gameDescription = document.getElementById('gameDescription');
    if (version === 'deluxe') {
      gameDescription.innerHTML = `
        <h3>Minecraft Dungeons : Ultimate Edition</h3>
        <p>En vente pour 39,99 € au cours des 30 derniers jours<br><br>
          Découvrez l’histoire complète de Minecraft Dungeons, du début à l'Ender ! 
          Découvrez l’Édition Ultime de Minecraft Dungeons, qui comprend le jeu de base et les six contenus téléchargeables. 
          Posséder l’Édition Ultime, c’est avoir accès à l’expérience complète pour un prix inférieur à celui des achats séparés. Obtenez votre copie dès aujourd’hui !</p>
      `;
    } else if (version === 'standard') {
      gameDescription.innerHTML = `
        <h3>Minecraft Dungeons : Standard Edition</h3>
        <p>En vente pour 19,99 € au cours des 30 derniers jours<br><br>
        Avancez en écartant l’ennemi dans un tout nouveau jeu d’action et d’aventure inspiré par les dungeon crawlers classiques et intégré à l’univers Minecraft ! 
        Avec la Standard Edition, recevez le Lanceur Minecraft pour Windows à partir du Microsoft Store.</p>
      `;
    }
  }
  
  let currentSlide = 0;
  const slides = [
    { src: 'pic/mcdu1.avif', description: 'Embarquez-vous dans une aventure commune ! Jouez avec vos amis en personne ou en ligne grâce au jeu multiplateforme.' },
    { src: 'pic/mcdu2.jpg', description: 'Explorez des donjons mystérieux et des cavernes sombres ! Découvrez des trésors et affrontez des monstres.' },
    { src: 'pic/mcdu3.avif', description: 'Partez à l’aventure dans un monde sans fin.' }
  ];
  
  function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;
  
    // Mise à jour de l'image principale et de la description
    document.querySelector('.main-imageMC').src = slides[currentSlide].src;
    document.querySelector('.image-descriptionMC').textContent = slides[currentSlide].description;
  
    // Mise à jour des miniatures actives
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, i) => {
      thumb.classList.toggle('active', i === currentSlide);
    });
  }
  
  function moveSlide(direction) {
    showSlide(currentSlide + direction);
  }
  
  function selectSlide(index) {
    showSlide(index);
  }
  
  // Afficher la première slide par défaut
  showSlide(currentSlide);


  function toggleFlip(card) {
    const flipCard = card.querySelector('.flip-card');
    flipCard.classList.toggle('flip-active'); 
    card.classList.toggle('flipped'); 
}

// Assurer que le popup est caché à l'ouverture de la page
window.onload = function() {
  document.getElementById('payPopup').style.display = 'none';
};

// Récupérer les éléments
const payButton = document.getElementById('payButton');
const payPopup = document.getElementById('payPopup');
const payPopupClose = document.getElementById('payPopupClose');

// Afficher le popup uniquement lorsque le bouton "Payer" est cliqué
payButton.addEventListener('click', function() {
    payPopup.style.display = 'flex'; 
});

// Fermer le popup lorsque l'utilisateur clique sur la croix
payPopupClose.addEventListener('click', function() {
    payPopup.style.display = 'none'; 
});

// Fermer le popup si l'utilisateur clique en dehors du popup
window.addEventListener('click', function(event) {
    if (event.target === payPopup) {
        payPopup.style.display = 'none'; 
    }
});