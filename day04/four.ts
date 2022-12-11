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

async function partTwo() {
  const lines = await readFile();
}
partTwo().then(console.log);