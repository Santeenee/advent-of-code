import fs from 'fs'
import splitNewLine from '../../utils/splitNewLine'

// -----------------
const isDemo = true
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
const gamePowers: number[] = []

// console.log(BAG)

// function getCubesPerGame(bag) {}

const matrix = input.map(game => game.split(''))

matrix.forEach((game, gameIndex) => {
	let validGame = true //part 1
	const minBalls = {
		red: 0,
		blue: 0,
		green: 0,
	}

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
				if (bagColor === color) {
					if (+num > bagNum) {
						validGame = false
					}

					switch (
						bagColor //part 2
					) {
						case 'red':
							if (+num > minBalls.red) {
								minBalls.red = +num
							}
							break
						case 'green':
							if (+num > minBalls.green) {
								minBalls.green = +num
							}
							break
						case 'blue':
							if (+num > minBalls.blue) {
								minBalls.blue = +num
							}
							break

						default:
							console.error("that shouldn't happen")
							break
					}
				}
			})
		}
		// console.log(ballSlice.map(ball => ball.join('')))
	})
	if (validGame) gameIds.push(gameIndex + 1)
	// console.log()
	// console.table(minBalls)
	const gamePower = minBalls.red * minBalls.green * minBalls.blue
	// console.table(gamePower)
	gamePowers.push(gamePower)
})

const result = [...new Set(gameIds)].reduce((a, b) => a + b) //part 1
const result_2 = gamePowers.reduce((a, b) => a + b)

// console.log(gameIds)
// console.log(result)
// console.log('Game powers array')
// console.table(gamePowers)
console.table(result_2)
// console.log(matrix)
// console.log(startGame)
