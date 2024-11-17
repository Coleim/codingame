const width: number = parseInt(readline()); // the number of cells on the X axis
const height: number = parseInt(readline()); // the number of cells on the Y axis

const grid: string[] = [];

for (let i = 0; i < height; i++) {
    grid.push(readline());
}

for (let y = 0 ; y < height; ++y ) {
    for(let x = 0; x <width; ++x) {
        if( grid[y][x] === '0') {
            let rightX = -1;
            let rightY = -1;
            let bottomX = -1;
            let bottomY = -1;

            // get next node in line
            for( let nextX = x+1 ; nextX < width; ++nextX ) {
                if (grid[y][nextX] === '0') {
                    rightX = nextX;
                    rightY = y;
                    break;
                }
            }
            for( let nextY = y+1 ; nextY < height; ++nextY ) {
                if (grid[nextY][x] === '0') {
                    bottomX = x;
                    bottomY = nextY;
                    break;
                }
            }
            console.log( `${x} ${y} ${rightX} ${rightY} ${bottomX} ${bottomY}` )
        }
    }
}
