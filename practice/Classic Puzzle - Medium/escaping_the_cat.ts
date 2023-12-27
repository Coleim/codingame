/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
class Point {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    print() {
        return this.x.toString() + ' ' + this.y.toString();
    }
}

function getAngle(p1: Point) {
    const rad = Math.atan2(p1.y,p1.x);
    let angle = rad * (180 / Math.PI);
    if (angle < 0.0)
       angle += 360;
    return angle;
}

function distance(p1: Point, p2: Point) {
    return Math.hypot(p2.x-p1.x, p2.y-p1.y)
}


function getInstersectingPoints(a: number, b: number, cx: number, cy: number, r: number): Point[] {
    let intersec: Point[] = [];
    const A = 1 + a*a;
    const B = 2 * (-cx + a * b - a * cy);
    const C = cx * cx + cy * cy + b * b - 2 * b * cy - r * r;
    const delta = B * B - 4 * A * C;
    if (delta > 0)
    {
        const x1 = (-B - Math.sqrt(delta)) / (2 * A);
        const y1 = a * x1 + b;     
        // console.error('x1: ', x1);
        // console.error('y1: ', y1);
        const x2 = (-B + Math.sqrt(delta)) / (2 * A);
        const y2 = a * x2 + b;
        // console.error('x2: ', x2);
        // console.error('y2: ', y2);

        const res1 = new Point(Math.round(x1), Math.round(y1));
        const res2 = new Point(Math.round(x2), Math.round(y2));

        intersec.push(res1);
        intersec.push(res2);
     
    } else if (delta == 0) {
        const x = -B / (2 * A);
        const y = a * x + b;
        const res = new Point(Math.round(x), Math.round(y));
        intersec.push(res);
    }

    return intersec;
}

const catSpeed: number = parseInt(readline());
const r: number = 500;

let startRush = false;
let finalDes;
// game loop
let maxDist = 0;

while (true) {
    var inputs: string[] = readline().split(' ');
    const mouseX: number = parseInt(inputs[0]);
    const mouseY: number = parseInt(inputs[1]);
    const catX: number = parseInt(inputs[2]);
    const catY: number = parseInt(inputs[3]);

    const cat = new Point(catX, catY);
    const mouse = new Point(mouseX, mouseY);

    let dest = new Point(-(catX+80), -(catY+80));

    const distCatMouse = distance(cat, mouse);
    console.error('distCatMouse: ', distCatMouse);
    if(maxDist<distCatMouse) {
        maxDist = distCatMouse;
        console.error('maxDist: ', maxDist);
    } else {
        console.error('max dist decrease !!! Escape ', maxDist);
        const am = (mouse.y) / (mouse.x);
        const bm = mouse.y - am*mouse.x;
        const intersecMouse = getInstersectingPoints(am,bm, 0, 0, 500);
        let shortDist = 999999999;
        intersecMouse.forEach( point => {
            console.error(point.print());
            let d = distance(point, mouse);
            if(d < shortDist) {
                dest = point;
                if(point.x > 0) {
                    dest.x += 100;
                } else {
                    dest.x -= 100;
                }
                if(point.y > 0) {
                    dest.y += 100;
                } else {
                    dest.y -= 100;
                }
                shortDist = d;
            }
        });

        let escapeCatDest;

        const a = (cat.y - mouse.y) / (cat.x - mouse.x);
        const b = cat.y - a*cat.x;
        const newR = Math.sqrt(cat.y*cat.y+cat.x*cat.x);
        const intersec = getInstersectingPoints(a,b, 0, 0, newR);
        intersec.forEach( point => {
            if(point.x === cat.x && point.y === cat.y) return;
            escapeCatDest = point;
            if(point.x > 0) {
                escapeCatDest.x += 100;
            } else {
                escapeCatDest.x -= 100;
            }
            if(point.y > 0) {
                escapeCatDest.y += 100;
            } else {
                escapeCatDest.y -= 100;
            }
        })

        
        console.error("escapeCatDest: ",  escapeCatDest.print());
        console.error("dest: ", dest.print());

        dest.x -= Math.round((dest.x-escapeCatDest.x)/1.5);
        dest.y -= Math.round((dest.y-escapeCatDest.y)/1.5);
        console.error("dest: ", dest.print());
        // escapeCatDest.x






        console.log(dest.print() + ' Escaping the cat');


        continue;
    }
    // console.error('Mouse: ', mouse.print());
    // console.error('a: ', a);
    // console.error('b: ', b);




    
    // const intersecMouse = getInstersectingPoints(am,bm, 0, 0, 500);
    // const distChat1 = distance(intersecMouse.at(0), cat);
    // console.error("Distance distChat1: " , distChat1 );
    // const distChat2 = distance(intersecMouse.at(1), cat);
    // console.error("Distance distChat2: " , distChat2 );
    // console.error(distChat1-distChat2)


    // console.error("Angle Chat: " , getAngle(cat));
    // console.error("Angle Souris: " , getAngle(mouse));
    // console.error("Angle chat - souris: " , getAngle(cat)-getAngle(mouse));
    // console.error("Angle souris - chat: " , getAngle(mouse)-getAngle(cat));



    // console.error('Droite: Y = ', a , " X + ", b );
    // console.error('Cercle: X² + Y² = ' , 500*500);
    
    const a = (cat.y - mouse.y) / (cat.x - mouse.x);
    const b = cat.y - a*cat.x;
    const newR = Math.sqrt(cat.y*cat.y+cat.x*cat.x);
    const intersec = getInstersectingPoints(a,b, 0, 0, newR);
    intersec.forEach( point => {
        if(point.x === cat.x && point.y === cat.y) return;
        dest = point;
        if(point.x > 0) {
            dest.x += 100;
        } else {
            dest.x -= 100;
        }
        if(point.y > 0) {
            dest.y += 100;
        } else {
            dest.y -= 100;
        }
    })

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    console.log(dest.print() + ' Escaping the cat');
}
