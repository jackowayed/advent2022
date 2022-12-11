import { readFile } from "../utils";
async function elfCalories() {
  let elves = [0];
  const lines = await readFile();
  console.log(lines);
  for (const line of lines) {
    if (line === "") {
      elves.push(0);
    } else {
      elves[elves.length - 1] += parseInt(line);
    }
  }
  return elves;
}
async function partOne() {
  const elves = await elfCalories();
  return Math.max(...elves);
}
partOne().then(console.log);
async function partTwo() {
  const elves = await elfCalories();
  elves.sort((a, b) => b - a);
  return elves[0] + elves[1] + elves[2];
}
partTwo().then(console.log);