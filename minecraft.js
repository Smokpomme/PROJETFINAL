window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const footer = document.querySelector('.footer');
        const footerRect = footer.getBoundingClientRect();
        const headerHeight = header.offsetHeight;

        if (footerRect.top < headerHeight) {
            header.style.position = 'absolute';
            header.style.top = `${window.scrollY + footerRect.top - headerHeight}px`;
        } else {
            header.style.position = 'fixed';
            header.style.top = '0';
        }
    });



const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('current-image');
const gameTitle = document.getElementById('game-title');
const gameDescription = document.getElementById('game-description');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        mainImage.src = this.src;

        gameTitle.textContent = this.dataset.title;
        gameDescription.textContent = this.dataset.description;

        thumbnails.forEach(thumb => thumb.classList.remove('selected'));
        this.classList.add('selected');
    });
});
