import { REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

const grid = fileInput.split(REGEX.NEWLINE).map(row => row.split(''));

const startPosition = [];

for (const [y, col] of grid.entries()) {
    for (const [x, _] of col.entries()) {
        if (grid[y][x] === 'S') {
            startPosition[0] = x;
            startPosition[1] = y;
        }
    }
}

const visited = new Set();
const stack = [[startPosition[0], startPosition[1] + 1]];

let part1 = 0;

while (stack.length > 0) {
    const [x, y] = stack.pop();

    if (grid[y][x] === '^') {
        const [nextXLeft, nextYLeft] = [x - 1, y];
        const [nextXRight, nextYRight] = [x + 1, y];
        
        const posKeyLeft = [nextXLeft, nextYLeft].join();
        const posKeyRight = [nextXRight, nextYRight].join();
        
        if (!visited.has(posKeyLeft) && nextXLeft > 0) {
            stack.push([nextXLeft, nextYLeft]);
        };
        
        if (!visited.has(posKeyRight) && (nextXRight < grid[0].length)) {
            stack.push([nextXRight, nextYRight]);
        }
    
        part1++;
        visited.add([x, y].join());
    } else if (grid[y][x] === '.') {
        const [nextX, nextY] = [x, y + 1];
    
        const posKey = [nextX, nextY].join();
        
        if (visited.has(posKey) || nextY >= grid.length) {
            continue;
        }

        stack.push([nextX, nextY]);
    }
}

console.log('Part 1', part1);

let pathCount = new Map([[startPosition[0], 1]]);

for (let col = 0; col < grid.length - 1; col++) {
    let nextCount = new Map();

    for (const [row, count] of pathCount.entries()) {
        const nextChar = grid[col + 1][row];

        if (nextChar === "^") {
            nextCount.set(row - 1, (nextCount.get(row - 1) || 0) + count);
            nextCount.set(row + 1, (nextCount.get(row + 1) || 0) + count);
        } else {
            nextCount.set(row, (nextCount.get(row) || 0) + count);
        }
    }

    pathCount = nextCount;
}

const part2 = [...pathCount.values()].reduce((acc, cur) => acc + cur, 0);

console.log('Part 2', part2);
