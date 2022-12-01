import { input, exampleInput } from './01-input';

const countCalories = (input: string[]) =>
  input.reduce((total, calories) => total + Number(calories), 0);

const getElves = (input: string) =>
  input.split(`\n\n`).map((cal) => cal.split(`\n`));

const elfTotals = getElves(input).map(countCalories);

const elfsSortedByCals = elfTotals
  .map((calories, idx) => ({ calories, idx }))
  .sort((a, b) => b.calories - a.calories);

const topThreeTotal = elfsSortedByCals
  .slice(0, 3)
  .reduce((total, elf) => total + elf.calories, 0);

console.log({
  // elfTotals,
  elfsSortedByCals,
  topThreeTotal,
});
