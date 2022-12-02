import { input, exampleInput } from './02-input';

/**
 * COL 1 is what opponent will play ->
 *  A: rock
 *  B: paper
 *  C: scissors
 *
 * COL 2 is what we will play ->
 *  X: rock
 *  Y: paper
 *  Z: scissors
 *
 * scoring ->
 *  1 for rock
 *  2 for paper
 *  3 for scissors
 *  0 if you lose
 *  3 if draw
 *  6 if win
 */
type Outcomes = 'lose' | 'draw' | 'win';
type OpponentMoves = 'A' | 'B' | 'C';
type MyMoves = 'X' | 'Y' | 'Z';
type Match = [OpponentMoves, MyMoves];

/**
 * CONSTANTS to easily tweak how scoring is determined
 */
const MOVE_SCORE_MAP: Record<MyMoves, number> = {
  X: 1,
  Y: 2,
  Z: 3,
};
const OUTCOME_SCORE_MAP: Record<Outcomes, number> = {
  lose: 0,
  draw: 3,
  win: 6,
};

/**
 * FUNCTIONALITY
 */
const matches: Match[] = input
  .split('\n')
  .map((match) => match.split(' ') as Match);

const getMatchOutcome = (match: Match) => {
  const [opponentMove, myMove] = match;
  // opponent plays rock
  if (opponentMove === 'A') {
    return myMove === 'X' ? 'draw' : myMove === 'Y' ? 'win' : 'lose';
  }
  // opponent plays paper
  if (opponentMove === 'B') {
    return myMove === 'X' ? 'lose' : myMove === 'Y' ? 'draw' : 'win';
  }
  // opponent plays scissors
  if (opponentMove === 'C') {
    return myMove === 'X' ? 'win' : myMove === 'Y' ? 'lose' : 'draw';
  }
};

const getMatchScore = (match: Match) => {
  const [_, myMove] = match;
  const moveScore = MOVE_SCORE_MAP[myMove];
  const outcome = getMatchOutcome(match);
  if (!outcome) {
    throw new Error(`Invalid match outcome for game: ${JSON.stringify(match)}`); // this should never occur but TS thinks "undefined" may be returned
  }
  const outcomeScore = OUTCOME_SCORE_MAP[outcome];

  return moveScore + outcomeScore;
};

const matchScores = matches.map(getMatchScore);
const totalScore = matchScores.reduce((total, score) => total + score, 0);

/**
 * 2nd array item in match is result of game, not the move I play
 *
 * X: lose
 * Y: draw
 * Z: win
 */
const STRATEGY_OUTCOME_MAP: Record<MyMoves, Outcomes> = {
  X: 'lose',
  Y: 'draw',
  Z: 'win',
};

const getMyStrategyMove = (opponentMove: OpponentMoves, outcome: Outcomes) => {
  // opponent plays rock
  if (opponentMove === 'A') {
    return outcome === 'lose' ? 'Z' : outcome === 'draw' ? 'X' : 'Y';
  }
  // opponent plays paper
  if (opponentMove === 'B') {
    return outcome === 'lose' ? 'X' : outcome === 'draw' ? 'Y' : 'Z';
  }
  // opponent plays scissors
  if (opponentMove === 'C') {
    return outcome === 'lose' ? 'Y' : outcome === 'draw' ? 'Z' : 'X';
  }
};

const getStrategyMatchScore = (match: Match) => {
  const [opponentMove, outcomeKey] = match;
  const outcome = STRATEGY_OUTCOME_MAP[outcomeKey];
  const outcomeScore = OUTCOME_SCORE_MAP[outcome];
  const myMove = getMyStrategyMove(opponentMove, outcome);
  if (!myMove) {
    throw new Error(`Invalid strategy move for game: ${JSON.stringify(match)}`); // this should never occur but TS thinks "undefined" may be returned
  }
  const moveScore = MOVE_SCORE_MAP[myMove];

  return moveScore + outcomeScore;
};

const strategyMatchScores = matches.map(getStrategyMatchScore);
const strategyTotalScore = strategyMatchScores.reduce(
  (total, score) => total + score,
  0
);

console.log({
  // matches,
  matchScores,
  totalScore,
  strategyMatchScores,
  strategyTotalScore,
});
