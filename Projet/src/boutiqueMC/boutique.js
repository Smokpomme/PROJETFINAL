function selectVersion(version) {
  // Réinitialiser toutes les boxes pour enlever la classe "selected"
  const versionBoxes = document.querySelectorAll('.version-box');
  versionBoxes.forEach(box => {
    box.classList.remove('selected');
  });

  // Add la classe "selected" à la version sélectionnée
  const selectedBox = document.querySelector(`.version-box[onclick="selectVersion('${version}')"]`);
  selectedBox.classList.add('selected');

  // Changer image principale en fonction de la version
  const mainImage = document.querySelector('.main-image');
  if (version === 'deluxe') {
    mainImage.src = 'PIC/deluxe1.jpg'; // Remplace par le chemin image Deluxe
  } else if (version === 'standard') {
    mainImage.src = 'PIC/standars1.jpg'; // Remplace par le chemin image Standard
  }

  // Changer la description en fonction de la version
  const gameDescription = document.getElementById('gameDescription');
  if (version === 'deluxe') {
    gameDescription.innerHTML = `
      <h3>Minecraft : éditions Java et Bedrock – Deluxe Collection</h3>
      <p>En vente pour 39,99 € au cours des 30 derniers jours<br><br>
        Découvrez toutes les différentes façons d’explorer, de survivre et de construire dans Minecraft avec Minecraft : Deluxe Collection pour PC avec Java et Bedrock et le launcher Minecraft inclus !
        Jouez à l’édition Bedrock sur un PC pour parcourir une infinité de contenus créés par la communauté sur la Place de marché de Minecraft, découvrez de nouveaux styles de jeu grâce à différentes cartes et exprimez-vous avec des objets et des émotes du créateur de personnage.*<br><br>
        <i>*Minecraft : édition Java s’exécute sur Windows, Mac et Linux ; Minecraft : édition Bedrock s’exécute sur Windows. Le contenu Deluxe Collection ne s’exécute que sur Minecraft : édition Bedrock sur Windows.</i></p>
    `;
  } else if (version === 'standard') {
    gameDescription.innerHTML = `
      <h3>Minecraft : éditions Java et Bedrock pour PC</h3>
      <p>En vente pour 29,99 € au cours des 30 derniers jours<br><br>
        Créez, explorez, restez en vie, puis recommencez. Obtenez Minecraft : éditions Java et Bedrock pour PC sous forme d’offre groupée. 
        Celle-ci vous permet de facilement passer d’un jeu à l’autre en utilisant le launcher Minecraft unifié et de jouer en mode multiplateforme avec n’importe quelle édition actuelle de Minecraft.*<br><br>
        <i>*Minecraft : édition Java s’exécute sur Windows, Mac et Linux ; Minecraft : édition Bedrock s’exécute sur Windows. Le contenu Deluxe Collection ne s’exécute que sur Minecraft : édition Bedrock sur Windows.</i></p>
    `;
  }
}

let currentSlide = 0;
const slides = [
  { src: 'pic/mc1.avif', description: 'Embarquez-vous dans une aventure commune ! Jouez avec vos amis en personne ou en ligne grâce au jeu multiplateforme.' },
  { src: 'pic/mc2.avif', description: 'Explorez des donjons mystérieux et des cavernes sombres ! Découvrez des trésors et affrontez des monstres.' },
  { src: 'pic/mc3.avif', description: 'Partez à l’aventure dans un monde sans fin.' }
];

function showSlide(index) {
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  // Maj de l'image principale et de la description
  document.querySelector('.main-imageMC').src = slides[currentSlide].src;
  document.querySelector('.image-descriptionMC').textContent = slides[currentSlide].description;

  // Maj des miniatures actives
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

//pop cacher au lancement de page
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
    payPopup.style.display = 'none'; // Cacher le popup
});

// Fermer le popup si l'utilisateur clique en dehors du popup
window.addEventListener('click', function(event) {
    if (event.target === payPopup) {
        payPopup.style.display = 'none'; 
    }
});