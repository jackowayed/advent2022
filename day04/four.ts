import { readFile } from "../utils";

function parseLine(line: string) {
  return line.split(/[-,]/).map(n => parseInt(n));
}

function encompasses(startA: number, endA: number, startB: number, endB: number) {
  return startA <= startB && endA >= endB;
}

function scoreLine(line: string) {
  const l = parseLine(line);
  //console.log(l);
  return +(encompasses(l[0], l[1], l[2], l[3])
    || encompasses(l[2], l[3], l[0], l[1]));
}

async function partOne() {
  const lines = await readFile();
  return lines.map(scoreLine).reduce((a, b) => a + b);
}
partOne().then(console.log);

function isDisjoint(startA: number, endA: number, startB: number, endB: number) {
  return endA < startB || endB < startA;
}

function scoreLineP2(line: string) {
  const l = parseLine(line);
  //console.log(l);
  return +(!isDisjoint(l[0], l[1], l[2], l[3]));
}

async function partTwo() {
  const lines = await readFile();
  return lines.map(scoreLineP2).reduce((a, b) => a + b);
}
partTwo().then(console.log);