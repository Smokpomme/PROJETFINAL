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
    let scrollListener = null;

    // Fonction pour ajouter/supprimer l'écouteur de défilement
    function toggleScrollListener() {
        const isMobile = window.innerWidth <= 480;
        
        // Supprimer l'ancien écouteur s'il existe
        if (scrollListener && !isMobile) {
            window.removeEventListener('scroll', scrollListener);
            header.classList.remove('hide');
            scrollListener = null;
        }
        
        // Ajouter un nouvel écouteur si on est en mobile
        if (isMobile && !scrollListener) {
            scrollListener = () => {
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
            };
            
            window.addEventListener('scroll', scrollListener);
        }
    }

    // Initialiser et écouter les changements de taille
    toggleScrollListener();
    window.addEventListener('resize', toggleScrollListener);
});