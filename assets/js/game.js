const board = document.getElementById('board');
const generator = document.getElementById('new-row-generator')
const transparent = 'opacity(0%)'
const red = 'invert(47%) sepia(74%) saturate(3260%) hue-rotate(340deg) brightness(102%) contrast(103%)'
ACTIVE = null

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

//count Rows created
let callCount = 0

//create a random arrow
const createRow = () => {
    //create row of arrows
    const newRow = board.cloneNode(true);
    const randomise  = Math.floor(Math.random() * 4);
    
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
            newRow.children[i].style.setProperty("--arrow-color", red);
        } else {
            newRow.children[i].style.setProperty("--arrow-color", transparent);
        }
    }

    //add arrow to top of screen
    generator.append(newRow);
    //animate the row
    animateRow(newRow)
}

let speed = 5000
let gameHeight = 850

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
        arrowRow.style.paddingTop = (dist * progress).toFixed(2) + 'px'
        if (runtime < duration){ // if duration not met yet
            requestAnimationFrame(function(timestamp){ // call requestAnimationFrame again with parameters
                moveit(timestamp, arrowRow, dist, duration)
            })
        }
        if (parseFloat(row.style.paddingTop).toFixed(2) > gameHeight-100){
            ACTIVE = row.getAttribute("data-active")
            console.log(ACTIVE, row.id)
            setTimeout(() => {
                ACTIVE = null;
                console.log(ACTIVE + " off")
            }, 1000)
        } 
    }

    window.requestAnimationFrame(function(timestamp){
        starttime = timestamp || new Date().getTime() //if browser doesn't support requestAnimationFrame, generate our own timestamp using Date
        moveit(timestamp, arrowRow, gameHeight, speed) // 400px over 1 second
    })
    //end of stolen code
}


const handleInput = (direction) => {

    const activeArrow = ACTIVE;
    const pressedKey = direction;

    console.log(activeArrow, pressedKey)

    if (pressedKey === activeArrow) {
        console.log("yay");
    } else {
        console.log("miss");
    }
}

const startGame = () => {

    createRow();
    // set the interval of when to show the arrows
    setInterval(() => {
        createRow();
    }, 3000)
}

startGame();