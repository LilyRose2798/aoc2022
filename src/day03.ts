import * as R from "rambda"

const parse = R.pipe(
    R.trim,
    R.split("\n"),
    R.map(R.split(""))
)

const priority = R.pipe(
    x => x.charCodeAt(0),
    x => x - (x >= 97 ? 96 : 38),
)

export const solveOne = R.pipe(
    parse,
    R.map(x => R.splitEvery(x.length / 2)(x)),
    R.map(R.pipe(
        ([x, y]) => R.intersection(x, y),
        R.head,
        priority
    )),
    R.sum
)

export const solveTwo = R.pipe(
    parse,
    x => R.splitEvery(3)(x),
    R.map(R.pipe(
        ([x, y, z]) => R.intersection(x, R.intersection(y, z)),
        R.head,
        priority
    )),
    R.sum
)
