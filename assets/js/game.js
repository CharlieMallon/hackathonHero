const board = document.getElementById('board');
const generator = document.getElementById('new-row-generator')
const transparent = 'opacity(0%)'
const red = 'invert(47%) sepia(74%) saturate(3260%) hue-rotate(340deg) brightness(102%) contrast(103%)'

let ACTIVE = null

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
    //animate the arrow
    animateRow(newRow)

    // removes the arrow from the dom
    setTimeout(() => {
        newRow.remove();
    }, 2200)

}

const animateRow = (row) => {


    const rowPosition = row.getBoundingClientRect().top; // top of new row
    const boardPosition = board.getBoundingClientRect().top; // top of board row

    const proximity = boardPosition - rowPosition; //how close are they together


    //set when the row is active and therefore can be pressed
    setTimeout(() => {
        ACTIVE = row.getAttribute("data-active")
    }, proximity + 1500)

    //set when the row is active null and therefore can NOT be pressed
    setTimeout(() => {
        ACTIVE = null
    }, proximity + 2000)

    //move the arrow up the screen
    const options = [{ transform: "translateY(10000px)" }];

    //move it for this long 
    const keyframes = {
        duration: 50000,
        iterations: Infinity
    }

    row.animate(options, keyframes)

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

    // set the interval of when to show the arrows
    setInterval(() => {
        createRow();
    }, 3000)
}

startGame();