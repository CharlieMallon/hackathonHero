const urlParams = new URLSearchParams(window.location.search);
const songIndex = parseInt(urlParams.get('songIndex'));
const carouselCards = document.getElementsByClassName("card")

// play audio for the game 

const PlayAudio = (songIndex) => {
    const audio = document.getElementById('game-audio')
    audio.play();
  }

  const loadSonginfo = (songIndex) => {
    const track = SONGS[songIndex];
    
    const audio = document.getElementById('game-audio')
    let artistElement = document.getElementById("artist")
    let songElement = document.getElementById("song")
    let levelElement = document.getElementById("level")
    
    audio.setAttribute("src", track.link)
    artistElement.innerHTML = track.artist
    songElement.innerHTML = track.song
    levelElement.innerHTML = track.level
  }

  loadSonginfo(songIndex)

  setInterval(function() {
    PlayAudio(songIndex)
  },1000);


