import * as R from "rambda"

const solve = (chunkFn: <T>(x: T[][]) => T[][][]) => R.pipe(
    R.trim,
    R.split("\n"),
    R.map(R.split("")),
    chunkFn,
    R.map(R.pipe(
        x => x.reduce(R.intersection),
        x => R.head(x),
        x => x.charCodeAt(0),
        x => x - (x >= 97 ? 96 : 38),
    )),
    R.sum
)

export const solveOne = solve(R.map(x => R.splitEvery(x.length / 2)(x)))

export const solveTwo = solve(R.splitEvery(3))
