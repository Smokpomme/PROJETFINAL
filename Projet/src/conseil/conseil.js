class Carousel {
    constructor(carouselId, visibleItems = 4) {
        this.carouselContainer = document.querySelector(`#${carouselId}`);
        this.list = this.carouselContainer.querySelector(".list");
        this.items = Array.from(this.list.querySelectorAll(".item"));
        this.currentIndex = 0;
        this.visibleItems = visibleItems;

        // Attache les événements pour les boutons
        this.carouselContainer.querySelector(".button--next").onclick = () => this.handleClick("next");
        this.carouselContainer.querySelector(".button--previous").onclick = () => this.handleClick("previous");
    }

    handleClick(direction) {
        if (direction === "next") {
            // Déplace le premier élément à la fin
            const firstItem = this.items.shift();
            this.items.push(firstItem);
            this.list.appendChild(firstItem);
        } else if (direction === "previous") {
            // Déplace le dernier élément au début
            const lastItem = this.items.pop();
            this.items.unshift(lastItem);
            this.list.insertBefore(lastItem, this.list.firstChild);
        }

        // Redéfinir la position pour le défilement
        this.list.style.transition = "none";
        this.list.style.transform = `translateX(0)`;
    }
}

class SlideCarousel {
    constructor(carouselId, visibleSlides = 4) {
        this.carouselContainer = document.querySelector(`#${carouselId}`);
        this.slidesContainer = this.carouselContainer.querySelector(".carrousel-slides");
        this.slides = Array.from(this.slidesContainer.querySelectorAll(".carr-slide"));
        this.currentSlideIndex = 0;
        this.visibleSlides = visibleSlides;

        // Attache les événements pour les flèches
        this.carouselContainer.querySelector(".carr-next").onclick = () => this.moveSlide(1);
        this.carouselContainer.querySelector(".carr-prev").onclick = () => this.moveSlide(-1);
    }

    moveSlide(direction) {
        const totalSlides = this.slides.length;

        // Mise à jour de l'index
        this.currentSlideIndex += direction;

        // Boucle infinie
        if (this.currentSlideIndex < 0) {
            this.currentSlideIndex = totalSlides - this.visibleSlides;
        } else if (this.currentSlideIndex >= totalSlides - this.visibleSlides + 1) {
            this.currentSlideIndex = 0;
        }

        // Calcul de la transformation pour afficher le bon groupe de slides
        const offset = -this.currentSlideIndex * (100 / this.visibleSlides);
        this.slidesContainer.style.transform = `translateX(${offset}%)`;
    }
}

// Initialise chaque carrousel séparément
const carrousel1 = new Carousel("carrousel-1");
const carrousel2 = new Carousel("carrousel-2");
const carrousel3 = new Carousel('carrousel-3');

// Initialise chaque carrousel de slides séparément
const slideCarousel1 = new SlideCarousel("carousel-1-images");
const slideCarousel2 = new SlideCarousel("carousel-2-images");
const slideCarousel3 = new SlideCarousel('carousel-3-images');
