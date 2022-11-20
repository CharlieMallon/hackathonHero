const board = document.getElementById('board');
const generator = document.getElementById('new-row-generator')
const transparent = 'opacity(0%)'
const red = 'invert(24%) sepia(97%) saturate(7063%) hue-rotate(349deg) brightness(94%) contrast(102%)'
const pink = 'invert(55%) sepia(75%) saturate(6672%) hue-rotate(278deg) brightness(96%) contrast(111%)'
const blue = 'invert(77%) sepia(44%) saturate(4914%) hue-rotate(126deg) brightness(111%) contrast(96%)'
const yellow = 'invert(94%) sepia(27%) saturate(5660%) hue-rotate(330deg) brightness(111%) contrast(90%)'
const colour = [red, pink, blue, yellow]
let ACTIVE = null
let ACTIVEROW = ''
let score = 0

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

//create a random arrow
const createRow = () => {
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
    //animate the row
    animateRow(newRow)
}


let speed = 5000;

let gameHeight = document.getElementsByClassName('game-wrapper')[0].offsetHeight
let buttonHeight = document.getElementById('board').offsetHeight

console.log('gameHeight', gameHeight)

const animateRow = (row) => {

    // code stolen from http://www.javascriptkit.com/javatutors/requestanimationframe.shtml
    let arrowRow = document.getElementById(row.id)
    let starttime

    function moveit(timestamp, arrowRow, dist, duration){
        //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date:
        timestamp = timestamp || new Date().getTime()
        let runtime = timestamp - starttime
        let progress = runtime / duration
        progress = Math.min(progress, 1)
        arrowRow.style.top = (dist * progress).toFixed(2) + 'px'
        if (runtime < duration){ // if duration not met yet
            requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
                moveit(timestamp, arrowRow, dist, duration)
            })
        }
        if (parseFloat(row.style.top).toFixed(2) > gameHeight-buttonHeight){
            ACTIVE = row.getAttribute("data-active")
            ACTIVEROW = row
            setTimeout(() => {
                ACTIVE = null;
            }, 1000)
        }
        if (parseFloat(row.style.top).toFixed(2) == gameHeight){
            arrowRow.remove()
        }
    }

    window.requestAnimationFrame(function(timestamp){
        starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, arrowRow, gameHeight, speed)
    })
    //end of stolen code
}


const handleInput = (direction) => {

    const activeArrow = ACTIVE;
    const pressedKey = direction;

    if (pressedKey === activeArrow) {
        console.log('yay')
        ACTIVEROW.remove();
        score = score + 10
    } else {
        console.log("miss")
    }

    document.getElementById('score').innerHTML = score;
}

const startGame = () => {

    createRow();
    // set the interval of when to show the arrows
    setInterval(() => {
        createRow();
    }, 1000)
}

startGame();