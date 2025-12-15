import { CHARS, REGEX } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

const machines = [];

for (const line of fileInput.split(REGEX.NEWLINE)) {
    const parts = line.split(CHARS.SPACE);
    const [state, buttons, joltages] = [parts[0], parts.slice(1, -1), parts.at(-1)];
   
    const indicators = state.match(/[(.#)+]/g);
    
    const desiredState = indicators.reduce((acc, indicator, i) => {
        if (indicator === '#') {
            return acc |= 1 << i;
        }
        return acc;
    }, 0);

    const lightButtons = buttons.map(button => {
        return button
            .slice(1, -1)
            .split(CHARS.COMMA)
            .reduce((acc, button) => acc |= 1 << Number(button), 0);
    });

    machines.push({ desiredState, lightButtons });
}

let part1 = 0;

for (const machine of machines) {
    const best = new Map();

    const queue = [{ lights: 0, presses: 0 }];

    dijkstra: while (queue.length > 0) {
        queue.sort((a, b) => a.presses - b.presses);

        const { lights, presses } = queue.shift();

        if (lights === machine.desiredState) {
            part1 += presses;
            break dijkstra;
        };

        if (best.has(lights) && best.get(lights) <= presses) {
            continue dijkstra;
        }

        best.set(lights, presses);

        for (const button of machine.lightButtons) {
            queue.push({
                lights: lights ^ button,
                presses: presses + 1,
            });
        }
    }
} 

console.log('Part 1', part1);