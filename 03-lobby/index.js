import { CHARS } from '../common.js';
import { getFileInput } from '../utils.js';

const fileInput = await getFileInput('input.txt');

function getLargestSeqFromDigits(seq, digits) {
    const largestSeq = [];
    let startIndex = 0;
    
    for (let i = digits; i > 0; i--) {
        let largestDigitIndex = startIndex;

        for (let j = startIndex; j <= seq.length - i; j++) {
            if (seq[j] > seq[largestDigitIndex]) {
                largestDigitIndex = j;
            }
        }

        largestSeq.push(seq[largestDigitIndex]);
        startIndex = largestDigitIndex + 1;
    }

    return largestSeq;
}

let part1 = 0;

for (const seq of fileInput.split(CHARS.NEWLINE)) {
    const numberSeq = seq.split('').map(Number);
    const largestSeq = getLargestSeqFromDigits(numberSeq, 2);
    const maxJoltage = parseInt(largestSeq.join(''));
    part1 += maxJoltage;
}

console.log('Part 1', part1);

let part2 = 0;

for (const seq of fileInput.split(CHARS.NEWLINE)) {
    const numberSeq = seq.split('').map(Number);
    const largestSeq = getLargestSeqFromDigits(numberSeq, 12);
    const maxJoltage = parseInt(largestSeq.join(''));
    part2 += maxJoltage;
}

console.log('Part 2', part2);