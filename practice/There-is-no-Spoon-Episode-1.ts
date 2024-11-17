/**
 * Don't let the machines win. You are humanity's last hope...
 **/

const width: number = parseInt(readline()); // the number of cells on the X axis
const height: number = parseInt(readline()); // the number of cells on the Y axis
for (let i = 0; i < height; i++) {
    const line: string = readline(); // width characters, each either 0 or .
    console.error("line: " , line)
}

// Write an action using console.log()
// To debug: console.error('Debug messages...');


// Three coordinates: a node, its right neighbor, its bottom neighbor
console.log('0 0 1 0 0 1');
