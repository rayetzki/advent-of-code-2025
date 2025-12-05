import { REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

const [rangesList, idsList] = fileInput.split(REGEX.DOUBLE_NEWLINE);

const ranges = rangesList.split(REGEX.NEWLINE).map(line => line.split(REGEX.SEPARATOR).map(Number));
const ids = idsList.split(REGEX.NEWLINE).map(Number);

let part1 = 0;

const usedIds = new Set();

for (const id of ids) {
    for (const [left, right] of ranges) {
        if (id >= left && id <= right && !usedIds.has(id)) {
            usedIds.add(id);
            part1++;
        }
    }
}

console.log('Part 1', part1);

let part2 = 0;

ranges.sort((a, b) => a[0] - b[0]);

let last;

for (const [low, high] of ranges) {
    if (!last) {
        last = [low, high];
    } else if (last[1] < low) {
        part2 += last[1] - last[0] + 1;
        last = [low, high];
    } else {
        last = [last[0], Math.max(high, last[1])];
    }
}

part2 += last[1] - last[0] + 1;

console.log('Part 2', part2);