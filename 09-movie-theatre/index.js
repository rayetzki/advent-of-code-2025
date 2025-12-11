import { REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

const tiles = fileInput.split(REGEX.NEWLINE).map(line => line.split(',').map(Number));

function getArea([x1, y1], [x2, y2]) {
    return (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);
}

let part1 = 0;

for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
        const area = getArea(tiles[i], tiles[j]);
        part1 = Math.max(part1, area);
    }
}

console.log('Part 1', part1);

const squares = [];
const sides = [];

for (let i = 0; i < tiles.length; i++) {
    sides.push({ a: tiles[i], b: tiles[(i + 1) % tiles.length] });
    
    for (let j = i + 1; j < tiles.length; j++) {
        const area = getArea(tiles[i], tiles[j]);
        squares.push({ area, a: tiles[i], b: tiles[j] });
    }
}

squares.sort((a, b) => b.area - a.area);

const disjoint = (a1, a2, b1, b2) =>
    Math.max(a1, a2) <= Math.min(b1, b2) ||
    Math.max(b1, b2) <= Math.min(a1, a2);

const { area: part2 } = squares.find(square => {
    return sides.every((side) => (
        disjoint(side.a[1], side.b[1], square.a[1], square.b[1]) ||
        disjoint(side.a[0], side.b[0], square.a[0], square.b[0])
    ));
});

console.log('Part 2', part2);