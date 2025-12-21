import { REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

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

const reversedRows = fileInput.split(REGEX.NEWLINE).map(line => line.split('').reverse().join(''));

const results = [];

let accumulator = [];

for (let i = 0; i < reversedRows[0].length; i++) {
    const currentLine = reversedRows.map((row) => row[i]).join('');
    
    if (currentLine.trim() === '') {
        continue;
    } else if (currentLine.endsWith('+') || currentLine.endsWith('*')) {
        const operator = currentLine.at(-1);
       
        accumulator.push(Number(currentLine.trim().slice(0, -1)));

        const result = accumulator.reduce((acc, num) => {
            if (operator === '+') {
                return acc + num;
            } else if (operator === '*') {
                return acc * num;
            }
        }, operator === '+' ? 0 : 1);

        results.push(result);
        accumulator = [];
    } else {
        accumulator.push(Number(currentLine.trim()));
    }
}

const part2 = results.reduce((acc, cur) => acc + cur, 0);

console.log('Part 2', part2);