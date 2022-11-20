var carousel = document.querySelector('.carousel');
var cellCount = 6;
var selectedIndex = 0;
var songIndex = 0


function rotateCarousel() {
  var angle = selectedIndex / cellCount * -360;
  carousel.style.transform = 'translateZ(-250px) rotateY(' + angle + 'deg)';
}

var prevButton = document.querySelector('.prev');
prevButton.addEventListener( 'click', function() {
  selectedIndex--;
  rotateCarousel();
  decreaseSongIndex();
  playTile()
});

var nextButton = document.querySelector('.next');
nextButton.addEventListener( 'click', function() {
  selectedIndex++;
  rotateCarousel();
  increaseSongIndex();
  playTile()
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


// Play music displayed on carousel
const playTile = () => {
    const track = SONGS[songIndex];
    let audio = document.getElementById('carousel-audio-player')
    audio.setAttribute("src", track.link)
    audio.volume = 0.2;
    audio.currentTime=10;
    audio.play();
    setInterval(function(){
      
      if(audio.currentTime>25){
        
        audio.pause();
      }
    },1000);
  }

// Increment song
const increaseSongIndex = () => {
    songIndex++
    if(songIndex === SONGS.length){
    songIndex = 0
    }
    console.log(songIndex)
}

// Decrease song index
const decreaseSongIndex = () => {
  if(songIndex === 0){
    songIndex = SONGS.length
  }
  songIndex--
  console.log(songIndex)
}

// Stop song 
const stopSong = () => {
  document.getElementById('carousel-audio-player').pause()
}


populateCarousel()
playTile()


// Play current song in slider 