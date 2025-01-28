// Fonction pour afficher le popup
function showCONPopup() {
    document.getElementById('CONpopup').style.display = 'flex';
  }
  
  // Fonction pour fermer le popup
  function closeCONPopup() {
    document.getElementById('CONpopup').style.display = 'none';
  }
  
  // À l'ouverture de la page, assurez-vous que le popup est caché
  window.onload = function() {
    document.getElementById('CONpopup').style.display = 'none';
  };