import { CHARS, REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

const paths = {};

for (const row of fileInput.split(REGEX.NEWLINE)) {
    const [from, to] = row.split(CHARS.COLON + CHARS.SPACE);
    paths[from] = to.split(CHARS.SPACE);
}

const cache = new Map();

const start = Object.entries(paths).find(([from, _]) => from === 'svr')[0];

function dfs(current, hasDac, hasFft) {
    if (current === 'out') return hasDac && hasFft ? 1 : 0;

    const key = [current, hasDac, hasFft].join(CHARS.COLON);

    if (cache.has(key)) return cache.get(key);

    const total = paths[current].reduce((acc, path) => {
        const nextHasDac = hasDac || current === 'dac';
        const nextHasFft = hasFft || current === 'fft';
        return acc + dfs(path, nextHasDac, nextHasFft);
    }, 0);

    cache.set(key, total);

    return total;
}

const part2 = dfs(start, false, false);

console.log('Part 2', part2);