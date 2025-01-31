// Fonction pour afficher le popup
function showCONPopup() {
    document.getElementById('CONpopup').style.display = 'flex';
}

// Fonction pour fermer le popup
function closeCONPopup() {
    document.getElementById('CONpopup').style.display = 'none';
}

// Fonction pour toggler le menu mobile
function toggleMobileMenu() {
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    mobileDropdown.classList.toggle('active');
    
    // Changer l'icône du bouton
    menuToggle.textContent = mobileDropdown.classList.contains('active') ? '✕' : '☰';
}

// Fermer le menu mobile si on clique en dehors
document.addEventListener('click', (event) => {
    const mobileDropdown = document.querySelector('.mobile-dropdown');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileDropdown && mobileDropdown.classList.contains('active')) {
        if (!mobileDropdown.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            mobileDropdown.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    }
});

// À l'ouverture de la page, assurez-vous que le popup est caché
window.onload = function() {
    document.getElementById('CONpopup').style.display = 'none';
};
