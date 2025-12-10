import { REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('test.txt');

const rows = fileInput
    .split(REGEX.NEWLINE)
    .map(row => row.split(' ')
    .filter(cell => cell.trim() !== ''));

const operandSets = rows.slice(0, -1);
const operators = rows.at(-1);

let part1 = 0;

for (let i = 0; i < operators.length; i++) {
    const operands = operandSets.map((set) => set[i]).map(cell => Number(cell.trim()));
    const operation = operators[i];

    if (operation === '*') {
        part1 += operands.reduce((acc, current) => acc * current, 1);
    } else if (operation === '+') {
        part1 += operands.reduce((acc, current) => acc + current, 0);
    } else {
        throw new Error(`Operation: ${operation} is not recognized`);
    }
}

console.log('Part 1', part1);

let part2 = 0;

console.log('Part 2', part2);