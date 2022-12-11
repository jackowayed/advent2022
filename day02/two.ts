import { readFile } from "../utils";

function outcomeScore(opponent: number, me: number) {
  if (opponent === me) return 3;
  // 1 Rock, loses to
  // 2 Paper, loses to
  // 3 Scissors, loses to 1 Rock
  if ((me - opponent + 3) % 3 === 1) {
    return 6;
  }
  return 0;
}

function scoreRoundOne(line: string) {
  const plays = line.split(" ");
  // convert to their shape scores: 1, 2, 3
  const opponent = plays[0].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  const me = plays[1].charCodeAt(0) - 'X'.charCodeAt(0) + 1;
  return me + outcomeScore(opponent, me);
}

async function partOne() {
  const lines = await readFile();
  return lines.map(scoreRoundOne).reduce((part, next) => part + next, 0);
}
partOne().then(console.log);

function scoreRoundTwo(line: string) {
  const plays = line.split(" ");
  // convert to shape score: 1, 2, 3
  const opponent = plays[0].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  let me;
  const strategy = plays[1];
  if (strategy === "Y") {
    // draw
    me = opponent;
  } else if (strategy === "X") {
    // lose
    //me = ((opponent + 3 - 2) % 3) + 1;
    me = opponent === 1 ? 3 : opponent - 1;
  } else if (strategy === "Z") {
    // win
    // % 3 prevents overflow to 4
    me = (opponent % 3) + 1;
  } else {
    console.assert(false, strategy);
    me = 0;
  }
  //console.log(opponent, me, me + outcomeScore(opponent, me));
  return me + outcomeScore(opponent, me);
}
async function partTwo() {
  const lines = await readFile();
  return lines.map(scoreRoundTwo).reduce((part, next) => part + next, 0);
}
partTwo().then(console.log);