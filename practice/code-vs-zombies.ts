/**
 * Save humans, destroy zombies!
 **/

interface Point {
    x: number;
    y: number;
}
interface Character {
    id: number;
    position: Point;
    positionNext?: Point;
}

function calculateDistance(pointA: Point, pointB: Point): number {
    const dx = pointB.x - pointA.x;
    const dy = pointB.y - pointA.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function getClosestCharacter(from: Point, characterList: Character[]): Point {
    let solution = from;
    let distance = Number.MAX_VALUE;
    characterList.forEach( char => {
        let newDist = calculateDistance(from, char.position)
        if(newDist < distance) {
            distance = newDist
            solution = char.position
        }
    })
    return solution;
}


// game loop
while (true) {
    var inputs: string[] = readline().split(' ');
    const x: number = parseInt(inputs[0]);
    const y: number = parseInt(inputs[1]);
    const player: Point = { x, y };
    const humans: Character[]= [];
    const humanCount: number = parseInt(readline());
    for (let i = 0; i < humanCount; i++) {
        var inputs: string[] = readline().split(' ');
        const humanId: number = parseInt(inputs[0]);
        const humanX: number = parseInt(inputs[1]);
        const humanY: number = parseInt(inputs[2]);
        humans.push({ id: humanId, position:{x: humanX, y: humanY} })
    }
    const zombies: Character[]= [];
    const zombieCount: number = parseInt(readline());
    for (let i = 0; i < zombieCount; i++) {
        var inputs: string[] = readline().split(' ');
        const zombieId: number = parseInt(inputs[0]);
        const zombieX: number = parseInt(inputs[1]);
        const zombieY: number = parseInt(inputs[2]);
        const zombieXNext: number = parseInt(inputs[3]);
        const zombieYNext: number = parseInt(inputs[4]);
        zombies.push({ id: zombieId, position:{x: zombieX, y: zombieY}, positionNext:{x: zombieXNext, y: zombieYNext}})
    }

    let humanInDanger: Character[] = [];
    let humanCanBeSaved: Character[] = [];
    humans.forEach( human => {
        zombies.forEach( zombie => {
            let futureDist = calculateDistance(human.position, zombie.positionNext!);
            if(futureDist <= 400) {
                humanInDanger.push(human)
            } else {
                let humanDist = calculateDistance(human.position, player);
                let zombieDist = calculateDistance(zombie.positionNext!, player);
                if(futureDist >= humanDist/1000) {
                    humanCanBeSaved.push(human)
                }
            }
        })
    })

    console.error("humanInDanger: " , humanInDanger)
    console.error("humanCanBeSaved: " , humanCanBeSaved)

    // Find zombie closest to the player
    let closestZombie = getClosestCharacter(player, zombies);
    // Find human closest to the player
    let closestHuman = getClosestCharacter(player, humanCanBeSaved);

    console.log(`${closestHuman.x} ${closestHuman.y}`)

}
