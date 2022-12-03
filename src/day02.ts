import * as R from "rambda"

const parse = R.pipe(
    R.trim,
    R.split("\n"),
    R.map(x => [
        x.charCodeAt(0) - 65,
        x.charCodeAt(2) - 88
    ])
)

const score = (opponent: number, self: number) => (self - opponent + 4) % 3 * 3 + self + 1

const move = (opponent: number, outcome: number) => (outcome + opponent + 2) % 3

export const solveOne = R.pipe(
    parse,
    R.map(([x, y]) => score(x, y)),
    R.sum
)

export const solveTwo = R.pipe(
    parse,
    R.map(([x, y]) => score(x, move(x, y))),
    R.sum
)
