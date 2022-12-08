import * as R from "rambda"

const solve = (placeFn: (x: string) => string) => R.pipe(
    R.trim,
    R.split("\n\n"),
    ([x, y]) => R.reduce(
        (state, [count, from, to]) => R.evolve({
            [from]: (x: string) => R.slice(0, -count)(x),
            [to]: (x: string) => x + R.pipe(
                R.prop(from),
                x => R.slice(-count, undefined)(x),
                placeFn
            )(state)
        })(state),
        R.pipe(
            R.split("\n"),
            R.map(x => R.splitEvery(4)(x)),
            R.transpose,
            R.map(R.pipe(
                x => R.reverse(x),
                ([x, ...y]): [number, string] => [
                    R.pipe(
                        R.trim,
                        Number
                    )(x),
                    R.pipe(
                        R.map(R.prop(1)),
                        R.join(""),
                        R.trim
                    )(y)
                ]
            )),
            x => R.fromPairs(x)
        )(x),
        R.pipe(
            R.split("\n"),
            R.map(R.pipe(
                R.split(" "),
                R.splitEvery(2),
                R.map(R.pipe(
                    R.last,
                    Number
                ))
            ))
        )(y)
    ),
    R.toPairs,
    R.sortBy(R.prop(0)),
    R.map(R.pipe(
        R.prop(1),
        R.last
    )),
    R.join("")
)

export const solveOne = solve(R.reverse)

export const solveTwo = solve(R.identity)
