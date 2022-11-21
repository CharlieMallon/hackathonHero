const board = document.getElementById('board');
const generator = document.getElementById('new-row-generator')
const transparent = 'opacity(0%)'
const red = 'invert(24%) sepia(97%) saturate(7063%) hue-rotate(349deg) brightness(94%) contrast(102%)'
const pink = 'invert(55%) sepia(75%) saturate(6672%) hue-rotate(278deg) brightness(96%) contrast(111%)'
const blue = 'invert(77%) sepia(44%) saturate(4914%) hue-rotate(126deg) brightness(111%) contrast(96%)'
const yellow = 'invert(94%) sepia(27%) saturate(5660%) hue-rotate(330deg) brightness(111%) contrast(90%)'
const colour = [red, pink, blue, yellow]
let score = 0
let stopFalling = false
let songEnd = false


// ---- Get the arrow that the user pressed
//event listener for touch screens
const arrowButton = document.getElementsByClassName('arrow');

for (let i = 0; i < arrowButton.length; i++) {
	arrowButton[i].addEventListener('click', function (e) {
		const direction = e.target.id;
        handleInput(direction)
	});
}

// Listens for a key to be pressed.
window.addEventListener('keydown', (e) => {
	const keyDirection = (e.key);
    handleInput(keyDirection)
});

// ----- Create the Arrows
//count Rows created
let callCount = 0
let duration = 5000; // higher the number the slower the arrow falls


//create a random arrow
const createRow = (startTime, songLength) => {
    if (!stopFalling){
        //create row of arrows
        const newRow = board.cloneNode(true);
        const randomise  = Math.floor(Math.random() * 4);
        const randomColor = colour[Math.floor(Math.random() * colour.length)];
        
        //incrementRow
        newRow.setAttribute('id', 'row'+callCount);
        newRow.setAttribute('class', 'moving-row');
        callCount+= 1;

        //sets a which arrow is active on the row
        const DIRECTIONS = ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"]
        newRow.setAttribute("data-active", DIRECTIONS[randomise]);

        //sets its start time
        //Each row needs to know its progress down the dom, so it can update its top px.  this means it needs to know when it was created.
        newRow.setAttribute("data-starttime", new Date().getTime());

        //colour random arrow red and rest transparent
        for (let i = 0; i < 4; i++) {
            if (i === randomise) {
                newRow.children[i].style.setProperty("--arrow-color", randomColor);
            } else {
                newRow.children[i].style.setProperty("--arrow-color", transparent);
            }
        }

        //add arrow to top of screen
        generator.append(newRow);
    }

    //stop arrow creation before end of song
    timeElapsed(startTime, songLength, duration)
}

let gameHeight = document.getElementsByClassName('game-wrapper')[0].offsetHeight
let buttonHeight = document.getElementById('board').offsetHeight

const animateRows = (allRows) => {
    if (!songEnd){
        // code inspired by from http://www.javascriptkit.com/javatutors/requestanimationframe.shtml
        function moveit(timestamp, allRows, dist, duration){
            //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
            timestamp = new Date().getTime()
            for (row of allRows) {
                let starttime = Number(row.dataset.starttime)
                let runtime = timestamp - starttime // how long since we last did this
                // duration = how long it should take
                //progress = how far down the dom it should be.
                let progress = runtime / duration 
                progress = Math.min(progress, 1) // keeps animation smooth
                row.style.top = (dist * progress).toFixed(2) + 'px' // move the row down the page
                //if in hit zone give click attribute
                if (parseFloat(row.style.top).toFixed(2) > gameHeight-(buttonHeight+5)) {
                    row.setAttribute('data-click', true)
                } 
                //Remove the row if off game page
                if (parseFloat(row.style.top).toFixed(2) == gameHeight){
                    row.remove()
                }
            };
            if (allRows){ // if song is running continue.
                requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again
                    moveit(timestamp, allRows, dist, duration)
                })
            }
        }

        window.requestAnimationFrame(function(timestamp){
            moveit(timestamp, allRows, gameHeight, duration)
        })
    }
}


const handleInput = (direction) => {

    const activeRows = document.querySelectorAll('[data-click=true]');
    if (activeRows.length){
        const activeRow = activeRows[0]
        const activeArrow = activeRow.dataset.active
        const pressedKey = direction; // direction pressed/clicked
    
        if (pressedKey === activeArrow) {
            document.getElementById('miss').classList.add('hidden')
            document.getElementById('hit').classList.remove('hidden')
            activeRow.remove()
            score = score + 10
        } else {
            document.getElementById('hit').classList.add('hidden')
            document.getElementById('miss').classList.remove('hidden')
            console.log("miss")
        }
    }

    document.getElementById('score').innerHTML = score;
}

const startGame = () => {
    const startTime = new Date().getTime()
    const songLength = 30000 // 30sec


    createRow();
    // set the interval of when to add the arrows
    setInterval(() => {
            createRow(startTime, songLength);
        }, 1000)
    
    //animate all rows
    let allRows = document.getElementsByClassName('moving-Row')
    
    animateRows(allRows)
}

const gameEnd = () => {
    console.log('pop up goes here')
}

//end the level after song length
const timeElapsed = (startTime, songLength, duration) => {
    if (!songEnd){
        if (new Date().getTime() - startTime > (songLength-duration)) {
            stopFalling = true
        }
        if (new Date().getTime() - startTime > songLength) {
            songEnd = true
            gameEnd()
        }
    }
}

startGame();