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

// Gestion du défilement du header en mobile
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    const delta = 5; // Sensibilité du défilement

    // Vérifier si c'est un appareil mobile
    const isMobile = window.matchMedia("(max-width: 480px)").matches;

    if (isMobile) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Détermine la direction du défilement
            if (Math.abs(lastScrollTop - scrollTop) <= delta) {
                return;
            }

            if (scrollTop > lastScrollTop && scrollTop > 50) {
                // Défilement vers le bas
                header.classList.add('hide');
            } else if (scrollTop < lastScrollTop) {
                // Défilement vers le haut
                header.classList.remove('hide');
            }

            lastScrollTop = scrollTop;
        });
    }
});