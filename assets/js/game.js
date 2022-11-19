const board = document.getElementById('board');
const generator = document.getElementById('new-row-generator')
const transparent = 'opacity(0%)'
const red = 'invert(47%) sepia(74%) saturate(3260%) hue-rotate(340deg) brightness(102%) contrast(103%)'

//create a random arrow
const createRow = () => {
    //create row of arrows
    const newRow = board.cloneNode(true);
    const randomise  = Math.floor(Math.random() * 4);

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

    //removes the arrow from the dom
    setTimeout(() => {
        newRow.remove();
    }, 2200)

}

const animateRow = (row) => {

    //move the arrow up the screen
    const options = [{ transform: "translateY(10000px)" }];

    //move it for this long 
    const keyframes = {
        duration: 50000,
        iterations: Infinity
    }

    row.animate(options, keyframes)

}

const startGame = () => {

    // set the interval of when to show the arrows
    setInterval(() => {
        createRow();
    }, 3000)
}

startGame();