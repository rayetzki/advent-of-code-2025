import { REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('test.txt');

const junctionBoxes = fileInput.split(REGEX.NEWLINE).map(line => line.split(',').map(Number));

const distances = [];

const junctionsMap = new Map();

for (let i = 0; i < junctionBoxes.length; i++) {
    junctionsMap.set(i, [i]);
    
    for (let j = 0; j < i; j++) {
        const [x1, y1, z1] = junctionBoxes[i];
        const [x2, y2, z2] = junctionBoxes[j];
        const dist = Math.hypot(x1 - x2, y1 - y2, z1 - z2);
        distances.push([dist, i, j]);
    }
}

const shortestDists = distances.toSorted((a, b) => a[0] - b[0]);

for (let i = 0; i < junctionBoxes.length; i++) {
    const [_, a, b] = shortestDists[i];

    const combined = [...new Set([...junctionsMap.get(a), ...junctionsMap.get(b)])];

    for (const box of combined) {
        junctionsMap.set(box, combined);
    }
}

const part1 = [...new Set(junctionsMap.values())]
    .sort((a, b) => b.length - a.length)
    .slice(0, 3)
    .reduce((acc, current) => acc * current.length, 1);

console.log('Part 1', part1);

junctionsMap.clear();

for (let i = 0; i < junctionBoxes.length; i++) {
    junctionsMap.set(i, [i]);
}

let part2 = 0;

const largestDists = distances.toSorted((a, b) => b[0] - a[0]);

for (let i = 0; junctionsMap.get(0).length < junctionBoxes.length; i++) {
    const [_, a, b] = largestDists.pop();

    const combined = [...new Set([...junctionsMap.get(a), ...junctionsMap.get(b)])];

    for (const item of combined) {
        junctionsMap.set(item, combined);
    }

    part2 = junctionBoxes[a][0] * junctionBoxes[b][0];
}

console.log('Part 2', part2);