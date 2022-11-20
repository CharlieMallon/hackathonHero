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


//Loop through song objects and creates a card for each one
const populateCarousel = () => {
  
  for (let i = 0; i < SONGS.length; i++){

    const element = document.createElement("div")

    // add background image
    element.classList.add('card', `song-${i}`)
    element.style.backgroundImage = `url(${SONGS[i].image})` 
    
    element.innerHTML = 
    `<p>${SONGS[i].name}<p>
    <p>${SONGS[i].artist}</p>
    `
    carousel.appendChild(element)
  }
}


populateCarousel()