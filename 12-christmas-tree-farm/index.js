import { CHARS, REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

const inputStr = fileInput.split(REGEX.DOUBLE_NEWLINE);

const [elements, grid] = [
    inputStr.slice(0, -1).map((line) => line.substring(3).split(REGEX.NEWLINE).map(line => line.split(''))),
    inputStr.at(-1).split(REGEX.NEWLINE).map(line => line.split(`${CHARS.COLON}${CHARS.SPACE}`)),
];

const presents = [];
const regions = [];

for (const [i, element] of elements.entries()) {
    for (let y = 0; y < element.length; y++) {
        for (let x = 0; x < element[y].length; x++) {
            if (element[y][x] === CHARS.HASH) {
                presents[i] ??= [];
                presents[i].push([x, y]);
            }
        }
    }
}

for (const [size, positionsStr] of grid) {
    const [width, height] = size.split(CHARS.CROSS).map(Number);
    const positions = positionsStr.split(CHARS.SPACE).map(Number);
    regions.push({
        width,
        height,
        positions: Object.fromEntries(positions.entries()),
    });
}

function rotate(element) {
    const maxY = Math.max(...element.map(([_, y]) => y));
    return element.map(([x, y]) => [maxY - y, x]);
}

function flipHorizontal(element) {
    const minX = Math.min(...element.map(([x, _]) => x));
    const maxX = Math.max(...element.map(([x, _]) => x));
    return element.map(([x, y]) => [maxX - (x - minX), y]);
}

function generateRotations(element) {
    const rotations = [];
    let currentRotation = element;

    for (let i = 0; i < 4; i++) {
        rotations.push(currentRotation);
        rotations.push(flipHorizontal(currentRotation));
        currentRotation = rotate(currentRotation);
    }

    return rotations;
}

function generatePlacements(region, element) {
    const { width, height } = region;
    const placements = [];
    
    const maxX = Math.max(...element.map(([x, y]) => x));
    const maxY = Math.max(...element.map(([x, y]) => y));

    for (let y = 0; y + maxY < height; y++) {
        for (let x = 0; x + maxX < width; x++) {
            let mask = 0n;

            for (const [cX, cY] of element) {
                mask |= 1n << BigInt((y + cY) * width + (x + cX));
            }

            placements.push(mask);
        }
    }

    return placements;
}

function isValidRegion(region, presents) {
    const regionSize = region.width * region.height;
    const variants = new Map();
    const cells = [];
    let presentsSize = 0;

    for (const [position, requiredPresents] of Object.entries(region.positions)) {
        if (requiredPresents === 0) continue;
        
        const present = presents[position];
        presentsSize += present.length * requiredPresents;

        if (presentsSize > regionSize) {
            return false;
        }
 
        const rotations = generateRotations(present);
        const placements = new Set();
        
        for (const rotation of rotations) {
            for (const placement of generatePlacements(region, rotation)) {
                placements.add(placement);
            }
        }

        variants.set(position, placements);

        for (let i = 0; i < requiredPresents; i++) {
            cells.push(position);
        }
    }

    cells.sort((a, b) => presents[b].length - presents[a].length);
    
    function backtrack(idx, occupied) {
        if (idx === cells.length) return true;

        const cell = cells[idx];

        for (const mask of variants.get(cell)) {
            if ((mask & occupied) !== 0n) continue;

            if (backtrack(idx + 1, occupied | mask)) {
                return true;
            }
        }

        return false;
    }

    return backtrack(0, 0n);
}

const part1 = regions.reduce((acc, region) => {
    if (isValidRegion(region, presents)) {
        return acc + 1;
    }
    return acc;
}, 0);

console.log('Part1', part1);