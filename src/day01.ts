import * as R from "rambda"

const solve = (n: number) => R.pipe(
    R.trim,
    R.split("\n\n"),
    R.map(R.pipe(
        R.split("\n"),
        R.map(Number)
    )),
    R.map(R.sum),
    R.sort(R.subtract),
    x => R.takeLast(n)(x),
    R.sum
)

export const solveOne = solve(1)

export const solveTwo = solve(3)
