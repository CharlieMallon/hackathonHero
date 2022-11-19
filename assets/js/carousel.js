var carousel = document.querySelector('.carousel');
var cellCount = 6;
var selectedIndex = 0;
function rotateCarousel() {
  var angle = selectedIndex / cellCount * -360;
  carousel.style.transform = 'translateZ(-250px) rotateY(' + angle + 'deg)';
}
var prevButton = document.querySelector('.prev');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
});
var nextButton = document.querySelector('.next');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
});