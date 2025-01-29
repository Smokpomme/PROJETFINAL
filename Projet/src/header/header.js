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
    let ticking = false;

    // Fonction pour ajouter/supprimer l'écouteur de défilement
    function toggleScrollListener() {
        const isMobile = window.innerWidth <= 480;
        
        // Supprimer l'ancien écouteur s'il existe
        if (!isMobile) {
            window.removeEventListener('scroll', handleScroll);
            header.classList.remove('hide');
            return;
        }

        // Ajouter un écouteur si on est en mobile
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Gestionnaire de défilement optimisé
    function handleScroll(event) {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Détermine la direction du défilement
                if (scrollTop > lastScrollTop) {
                    // Défilement vers le bas - se retire immédiatement
                    header.classList.add('hide');
                } else {
                    // Défilement vers le haut
                    header.classList.remove('hide');
                }

                lastScrollTop = scrollTop;
                ticking = false;
            });

            ticking = true;
        }
    }

    // Initialiser et écouter les changements de taille
    toggleScrollListener();
    window.addEventListener('resize', toggleScrollListener);
});