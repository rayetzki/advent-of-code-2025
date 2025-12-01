import { REGEX } from '../common.mjs';
import { getFileInput } from '../utils.mjs';

const fileInput = await getFileInput('input.txt');

const START_POSITION = 50;
const MAX_POSITION = 99;

let pointer = START_POSITION;
let part1 = 0;

for (const line of fileInput.split(REGEX.NEWLINE)) {
    const [direction, count] = [line.slice(0, 1), parseInt(line.slice(1), 10)];
   
    if (count === 0) {
        continue;
    }

    pointer += (direction === 'L') ? -count : count;

    pointer %= (MAX_POSITION + 1);

    if (pointer === 0) {
        part1++;
    }
}

console.log('Part 1', part1);

pointer = START_POSITION;

let part2 = 0;

for (const line of fileInput.split(REGEX.NEWLINE)) {
    const [direction, count] = [line.slice(0, 1), parseInt(line.slice(1), 10)];

    for (let i = 0; i < count; i++) {
        pointer += (direction === 'L') ? -1 : 1;
        pointer %= (MAX_POSITION + 1);
        
        if (pointer === 0) {
            part2++;
        }
    }
}

console.log('Part 2', part2);