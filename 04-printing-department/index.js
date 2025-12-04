import { REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

const grid = fileInput.split(REGEX.NEWLINE).map(row => row.split(''));

let part1 = 0;

function getGridAdjacentCells(grid, [x, y]) {
    return [
        grid[y]?.[x - 1],
        grid[y]?.[x + 1],
        grid?.[y + 1]?.[x - 1],
        grid?.[y + 1]?.[x],
        grid?.[y + 1]?.[x + 1],
        grid?.[y - 1]?.[x - 1],
        grid?.[y - 1]?.[x],
        grid?.[y - 1]?.[x + 1]
    ];
}

for (const [y, col] of grid.entries()) {
    for (const [x, _] of col.entries()) {
        if (grid[y][x] === '@') {
            const adjacentCells = getGridAdjacentCells(grid, [x, y]);
            const isForkliftAccessible = adjacentCells.filter(c => c === '@').length < 4;

            if (isForkliftAccessible) {
                part1++;
            }
        }
    }
}

console.log('Part 1', part1);

let part2 = 0;

while (true) {
    let removedCells = 0;

    for (const [y, col] of grid.entries()) {
        for (const [x, _] of col.entries()) {
            if (grid[y][x] === '@') {
                const adjacentCells = getGridAdjacentCells(grid, [x, y]);
                const isForkliftAccessible = adjacentCells.filter(c => c === '@').length < 4;

                if (isForkliftAccessible) {
                    grid[y][x] = '.';
                    removedCells++;
                }
            }
        }
    }

    if (removedCells > 0) {
        part2 += removedCells;
    } else {
        break;
    }
}

console.log('Part 2', part2);