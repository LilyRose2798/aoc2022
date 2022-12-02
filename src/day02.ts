
const parse = (input: string) => input.trim().split("\n").map(x => [x.charCodeAt(0) - 65, x.charCodeAt(2) - 88])

const score = (opponent: number, self: number) => (self - opponent + 4) % 3 * 3 + self + 1

const move = (opponent: number, outcome: number) => (outcome + opponent + 2) % 3

export const solveOne = (input: string) => parse(input).map(([x, y]) => score(x, y)).reduce((a, b) => a + b)

export const solveTwo = (input: string) => parse(input).map(([x, y]) => score(x, move(x, y))).reduce((a, b) => a + b)
