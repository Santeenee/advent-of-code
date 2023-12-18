import fs from 'fs'
import splitNewLine from '../../utils/splitNewLine'

// -----------------
const isDemo = false
// -----------------

let input: string[] = []
try {
	isDemo
		? (input = splitNewLine(fs.readFileSync('demoInput.txt').toString()))
		: (input = splitNewLine(fs.readFileSync('input.txt').toString()))
} catch (error) {
	console.error('error reading input file\n', error)
}

//constants
const BAG = {
	red: 12,
	green: 13,
	blue: 14,
} as const

const START_CHAR = ':'
const ROUND_SEPARATOR = ';'
const BALL_SEPARATOR = ','

const gameIds: number[] = []

console.log(BAG)

// function getCubesPerGame(bag) {}

const matrix = input.map(game => game.split(''))

matrix.forEach((game, gameIndex) => {
	let validGame = true
	const startGame = game.indexOf(START_CHAR) + 2

	const roundsEndIndexes: number[] = []
	const roundsSlice: string[][] = []

	//find all ';'
	game.forEach((char, nChar) => {
		if (char === ROUND_SEPARATOR) roundsEndIndexes.push(nChar)
	})

	//create slice for each round
	for (let round = 0; round < roundsEndIndexes.length + 1; round++) {
		roundsSlice[round] = game.slice(
			round === 0 ? startGame : roundsEndIndexes[round - 1] + 2,
			roundsEndIndexes[round] ?? undefined
		)
	}

	roundsSlice.forEach(round => {
		const ballsEndIndexes: number[] = []
		const ballSlice: string[][] = []

		//find all ':'
		round.forEach((char, nChar) => {
			if (char === BALL_SEPARATOR) ballsEndIndexes.push(nChar)
		})

		//create slice for each ball
		for (let ball = 0; ball < ballsEndIndexes.length + 1; ball++) {
			ballSlice[ball] = round.slice(
				ball === 0 ? 0 : ballsEndIndexes[ball - 1] + 2,
				ballsEndIndexes[ball] ?? undefined
			)
			//TODO say if this game is "POSSIBLE with <n> amount of <color> balls"
			const [num, color] = ballSlice[ball].join('').split(' ')

			Object.entries(BAG).forEach(([bagColor, bagNum]) => {
				if (bagColor === color && +num > bagNum) {
					validGame = false
				}
			})
		}
		// console.log(ballSlice.map(ball => ball.join('')))
	})
	if (validGame) gameIds.push(gameIndex + 1)
})

const result = [...new Set(gameIds)].reduce((a, b) => a + b)

console.log(gameIds)
console.log(result)
// console.log(matrix)
// console.log(startGame)
