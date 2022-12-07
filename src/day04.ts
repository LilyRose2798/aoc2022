import * as R from "rambda"

const solve = (filterFn: (x: number[][]) => boolean) => R.pipe(
    R.trim,
    R.split("\n"),
    R.map(R.pipe(
        R.split(","),
        R.map(R.pipe(
            R.split("-"),
            R.map(Number)
        ))
    )),
    R.filter(filterFn),
    R.length
)

export const solveOne = solve(([[x1, x2], [y1, y2]]) =>
    (x1 >= y1 && x2 <= y2) || (y1 >= x1 && y2 <= x2))

export const solveTwo = solve(([[x1, x2], [y1, y2]]) =>
    (x2 >= y1 && x1 <= y2) || (y2 >= x1 && y1 <= x2))
