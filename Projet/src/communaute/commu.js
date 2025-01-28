
  function toggleFlip(card) {
    const flipCard = card.querySelector('.flip-card');
    flipCard.classList.toggle('flip-active'); // Appliquez l'effet de flip
    card.classList.toggle('flipped'); // Ajoutez/enlevez la classe 'flipped'
}

// Fonction pour afficher le popup
function showPopup() {
  document.getElementById('popup').style.display = 'flex';
}

// Fonction pour fermer le popup
function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// À l'ouverture de la page, assurez-vous que le popup est caché
window.onload = function() {
  document.getElementById('popup').style.display = 'none';
};