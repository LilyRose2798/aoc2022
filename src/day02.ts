import * as R from "rambda"

const solve = (mapFn: (x: number, y: number) => number) => R.pipe(
    R.trim,
    R.split("\n"),
    R.map(x => [
        x.charCodeAt(0) - 65,
        x.charCodeAt(2) - 88
    ]),
    R.map(R.apply(mapFn)),
    R.sum
)

const score = (them: number, us: number) => (us - them + 4) % 3 * 3 + us + 1

const move = (them: number, res: number) => (res + them + 2) % 3

export const solveOne = solve(score)

export const solveTwo = solve((x, y) => score(x, move(x, y)))
