import { CHARS, REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

let part1 = 0;

for (const pair of fileInput.split(CHARS.COMMA)) {
    const [start, finish] = pair.split(REGEX.SEPARATOR).map(Number);

    for (let i = start; i <= finish; i++) {
        const iStr = String(i);
        
        const [left, right] = [
            iStr.slice(0, Math.floor(iStr.length / 2)),
            iStr.slice(Math.floor(iStr.length / 2))
        ];

        if (left === right) {
            part1 += i;
        }
    }
}

console.log('Part 1', part1);

let part2 = 0;

for (const pair of fileInput.split(CHARS.COMMA)) {
    const [start, finish] = pair.split(REGEX.SEPARATOR).map(Number);

    for (let i = start; i <= finish; i++) {
        const seq = String(i);

        for (let j = 1; j <= Math.floor(seq.length / 2); j++) {
            const numOfChunks = Math.ceil(seq.length / j);
            const chunks = Array.from({ length: numOfChunks }, (_, i) => seq.slice(i * j, i * j + j));
            
            if (chunks.every((chunk) => chunk === chunks[0])) {
                part2 += i;
                break;
            }
        }
    }
}

console.log('Part 2', part2);