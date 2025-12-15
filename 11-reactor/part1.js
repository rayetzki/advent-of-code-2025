import { CHARS, REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

const paths = {};

for (const row of fileInput.split(REGEX.NEWLINE)) {
    const [from, to] = row.split(CHARS.COLON + CHARS.SPACE);
    paths[from] = to.split(CHARS.SPACE);
}

let part1 = 0;

const queue = [Object.entries(paths).find(([from, _]) => from === 'you')[0]];

while (queue.length > 0) {
    const next = queue.shift();
    
    if (next === 'out') {
        part1++;
        continue;
    }

    if (!Object.hasOwn(paths, next)) {
        continue;
    }
    
    queue.push(...paths[next]);
}

console.log('Part 1', part1);