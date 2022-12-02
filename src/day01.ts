
const parse = (input: string) => input.trim().split("\n\n").map(x => x.split("\n").map(Number))

const solve = (input: string, n: number) => parse(input).map(x => x.reduce((a, b) => a + b)).sort((a, b) => a - b).slice(-n).reduce((a, b) => a + b)

export const solveOne = (input: string) => solve(input, 1)

export const solveTwo = (input: string) => solve(input, 3)
