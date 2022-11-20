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
    audio.currentTime=10;
    audio.play();
    setInterval(function(){
      
      if(audio.currentTime>25){
        audio.currentTime=10
      }
    },1000);
  }

// Increment song
const increaseSongIndex = () => {
    songIndex++
    if(songIndex === SONGS.length){
    songIndex = 0
    }
}

// Decrease song index
const decreaseSongIndex = () => {
  if(songIndex === 0){
    songIndex = SONGS.length
  }
  songIndex--
}


// volume 
let slider = document.getElementById('volume')
var volumeSettings = slider.value / 100
let muteButton = document.getElementById('mute-button')

// Volume Slider
slider.oninput = function () {
  let audio = document.getElementById('carousel-audio-player')
  volumeSettings = this.value / 100;

  audio.volume = volumeSettings 
  console.log(volumeSettings)
  changeMuteBtn()
  console.log(volumeSettings)
  }

// Mute Button


// Mute Volume 
const muteVolume = () => {
  const audio = document.getElementById('carousel-audio-player')
  if(volumeSettings === 0 ){
    unmutVolume()
    return
  }
  audio.volume = 0
  volumeSettings = 0 / 100
  changeMuteBtn()
}
muteButton.addEventListener('click', muteVolume)

// Mute Volume 
const unmutVolume = () => {
  const audio = document.getElementById('carousel-audio-player')
  audio.volume = 0.5
  volumeSettings = 0.5 
  changeMuteBtn()
}
muteButton.addEventListener('click', muteVolume)
 
// change mute button
const changeMuteBtn = () => {
  let muteBtnImg = document.getElementById("mute-button")
  
  console.log(muteBtnImg)
  console.log('change' + volumeSettings)
  if(volumeSettings === 0 ){
    muteBtnImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m40.65 45.2-6.6-6.6q-1.4 1-3.025 1.725-1.625.725-3.375 1.125v-3.1q1.15-.35 2.225-.775 1.075-.425 2.025-1.125l-8.25-8.3V40l-10-10h-8V18h7.8l-11-11L4.6 4.85 42.8 43Zm-1.8-11.6-2.15-2.15q1-1.7 1.475-3.6.475-1.9.475-3.9 0-5.15-3-9.225-3-4.075-8-5.175v-3.1q6.2 1.4 10.1 6.275 3.9 4.875 3.9 11.225 0 2.55-.7 5t-2.1 4.65Zm-6.7-6.7-4.5-4.5v-6.5Q30 17 31.325 19.2q1.325 2.2 1.325 4.8 0 .75-.125 1.475-.125.725-.375 1.425Zm-8.5-8.5-5.2-5.2 5.2-5.2Zm-3 14.3v-7.5l-4.2-4.2h-7.8v6h6.3Zm-2.1-9.6Z"/></svg>`
    document.getElementById('volume').setAttribute("value", 0)
  } else {
    muteBtnImg.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28 41.45v-3.1q4.85-1.4 7.925-5.375T39 23.95q0-5.05-3.05-9.05-3.05-4-7.95-5.35v-3.1q6.2 1.4 10.1 6.275Q42 17.6 42 23.95t-3.9 11.225Q34.2 40.05 28 41.45ZM6 30V18h8L24 8v32L14 30Zm21 2.4V15.55q2.75.85 4.375 3.2T33 24q0 2.85-1.65 5.2T27 32.4Zm-6-16.8L15.35 21H9v6h6.35L21 32.45ZM16.3 24Z"/></svg>`
    document.getElementById('volume').setAttribute("value", 5)
  }
}

// Stop song 
const stopSong = () => {
  document.getElementById('carousel-audio-player').pause()
}




populateCarousel()
playTile()


