var countDownDate = new Date("Dec 31, 2024 23:59:59").getTime();

var x = setInterval(function() {
  var now = new Date().getTime();
  var distance = countDownDate - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);




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
