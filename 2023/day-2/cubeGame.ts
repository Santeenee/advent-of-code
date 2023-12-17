import fs from 'fs'
import splitNewLine from '../../utils/splitNewLine'

// ----------------
const isDemo = true
// ----------------

let input: string[] = []
try {
	isDemo
		? (input = splitNewLine(fs.readFileSync('demoInput.txt').toString()))
		: (input = splitNewLine(fs.readFileSync('input.txt').toString()))
} catch (error) {
	console.error('error reading input file\n', error)
}

//types
type Round = {
	reds: number
	greens: number
	blues: number
}

type Game = Round[]

type Games = Game[]

//constants
const BAG = {
	reds: 12,
	greens: 13,
	blues: 14,
} as const

const games: {}[] = []

console.log(BAG)

// function getCubesPerGame(bag) {}
