import { readFile } from "../utils";

async function partOne() {
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
  //console.log(elves);
  return Math.max(...elves);
}
partOne().then(console.log);
