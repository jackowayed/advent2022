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

function scoreRound(line: string) {
  const plays = line.split(" ");
  // convert to their shape scores: 1, 2, 3
  const opponent = plays[0].charCodeAt(0) - 'A'.charCodeAt(0) + 1;
  const me = plays[1].charCodeAt(0) - 'X'.charCodeAt(0) + 1;
  return me + outcomeScore(opponent, me);
}

async function partOne() {
  const lines = await readFile();
  return lines.map(scoreRound).reduce((part, next) => part + next, 0);
}
partOne().then(console.log);
async function partTwo() {

}
partTwo().then(console.log);