import { readFile, writeFile } from "fs/promises"
import { performance } from "perf_hooks"

import * as day01 from "./day01"
import * as day02 from "./day02"
import * as day03 from "./day03"
import * as day04 from "./day04"

type Solver = {
    solveOne: (input: string) => any,
    solveTwo: (input: string) => any
}

const solvers: Solver[] = [
    day01,
    day02,
    day03,
    day04
]

const padDay = (day: number) => day < 10 ? `0${day}` : day
const dayFilename = (day: number) => `input/day${padDay(day)}.txt`

const downloadInput = async (day: number) =>
    writeFile(dayFilename(day),
    await (await fetch(`https://adventofcode.com/2022/day/${day}/input`, {
        headers: { cookie: (await readFile(".cookie")).toString() }
    })).text())

const readInput = async (day: number) => (await readFile(dayFilename(day)).catch(_ =>
    downloadInput(day).then(() => readFile(dayFilename(day))))).toString()

const solve = (input: string, solver: Solver) => {
    const startTime = performance.now()
    const solutionOne = solver.solveOne(input)
    const solutionOneTime = performance.now()
    const solutionTwo = solver.solveTwo(input)
    const solutionTwoTime = performance.now()
    const solutionOneMs = solutionOneTime - startTime
    const solutionTwoMs = solutionTwoTime - solutionOneTime
    const combinedMs = solutionTwoTime - startTime
    return { solutionOne, solutionOneMs, solutionTwo, solutionTwoMs, combinedMs }
}

;(async () => {
    let totalMs = 0
    for (let day = 1; day <= solvers.length; day++) {
        const input = await readInput(day)
        const solver = solvers[day - 1]
        const solutions = solve(input, solver)
        console.log(`Day ${padDay(day)}\nPart One: ${solutions.solutionOne
            }\t(Time: ${solutions.solutionOneMs.toFixed(3)}ms)\nPart Two: ${solutions.solutionTwo
            }\t(Time: ${solutions.solutionTwoMs.toFixed(3)}ms)\nCombined Time: ${solutions.combinedMs.toFixed(3)}ms`)
        totalMs += solutions.combinedMs
    }
    console.log(`Total Time: ${totalMs.toFixed(3)}ms`)
})()
