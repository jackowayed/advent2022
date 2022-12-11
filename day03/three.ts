import { readFile } from "../utils";

function findSharedItem(line: string) {
  const firstHalf = new Set(line.substring(0, line.length / 2));
  const secondHalf = new Set(line.substring(line.length / 2));
  const intersection = new Set(
    [...firstHalf].filter(element => secondHalf.has(element))
  );
  console.assert(intersection.size === 1, intersection.toString());
  for (let item of intersection) return item;
  return ""; // unreachable;
}

function scoreItem(c: string) {
  const ascii = c.charCodeAt(0);
  if (ascii < 96) {
    // Capitals
    return ascii - 65 + 27;
  } else {
    // Lowers
    return ascii - 97 + 1;
  }
}

function scoreLine(line: string) {
  return scoreItem(findSharedItem(line));
}

async function partOne() {
  const lines = await readFile();
  return lines.map(scoreLine).reduce((a, b) => a + b);
}
partOne().then(console.log);

function intersectGroup(lineOne: string, lineTwo: string, lineThree: string) {
  const one = new Set(lineOne);
  const two = new Set(lineTwo);
  const three = new Set(lineThree);
  const intersection = [...one].filter(element => two.has(element) && three.has(element));
  console.assert(intersection.length === 1, intersection.toString());
  return intersection[0];
}

function scoreGroup(lineOne: string, lineTwo: string, lineThree: string) {
  return scoreItem(intersectGroup(lineOne, lineTwo, lineThree));
}

async function partTwo() {
  const lines = await readFile();
  let score = 0;
  for (let i = 0; i < lines.length; i += 3) {
    score += scoreGroup(lines[i], lines[i + 1], lines[i + 2]);
  }
  return score;
}
partTwo().then(console.log);

