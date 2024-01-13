import fs from 'fs'
import splitNewLine from '../../utils/splitNewLine'

// -----------------
const isDemo = true
// -----------------

let input: string[] = []
try {
	if (isDemo) input = splitNewLine(fs.readFileSync('demoInput.txt').toString())
	else input = splitNewLine(fs.readFileSync('input.txt').toString())
} catch (error) {
	console.error('error reading input file\n', error)
}

// * TYPES
type Part = {
	num: number
	row: number
	cols: { startCol: number; endCol: number }
}

type Symbol = {
	char: string
	row: number
	col: number
}

type Coordinates = Symbol

// * DATA
const PARTS: Part[] = []
const SYMBOLS: Symbol[] = []
const GEAR_PART_NUMS: number[] = []

const numbersRegexp = /\d+/g
const aNumRegexp = /^\d$/
const symbolRegexp = /(?!\.)\W/g
const onlySymbolRegexp = /^(?!\.)\W$/

// * CODE
// get all PARTS and SYMBOLS
input.forEach((line, nLine) => {
	const numbers = [...line.matchAll(numbersRegexp)]
	for (const matched of numbers) {
		if (matched.length > 0 && matched.index && matched.index >= 0) {
			PARTS.push({
				num: +matched[0],
				row: nLine,
				cols: {
					startCol: matched.index,
					endCol: matched.index + matched[0].length - 1,
				},
			})
		}
	}

	const symbols = [...line.matchAll(symbolRegexp)]
	for (const matched of symbols) {
		if (matched.length > 0 && matched.index && matched.index >= 0) {
			SYMBOLS.push({
				char: matched[0],
				row: nLine,
				col: matched.index,
			})
		}
	}
})

//remove non engine parts
for (let nPart = 0; nPart < PARTS.length; nPart++) {
	const part = PARTS[nPart]

	const {
		num,
		row,
		cols: { startCol },
	} = part

	const coord = {
		char: num.toString(),
		row: row,
		col: startCol,
	}
	const enginePart = searchAroundAString(coord, onlySymbolRegexp)

	//DELETE part because it's not an engine part
	if (!enginePart) {
		// console.log('Non engine part', part)
		PARTS.splice(nPart, 1)
		nPart--
	}
}

//find engine gears
for (let nSymbol = 0; nSymbol < SYMBOLS.length; nSymbol++) {
	const symbol = SYMBOLS[nSymbol]

	// biome-ignore lint/style/noVar: <explanation>
	// biome-ignore lint/correctness/noInnerDeclarations: <explanation>
	var min = 2
	const foundCoord = searchAroundAString(symbol, aNumRegexp, min) //at least find two characters :/
	if (Array.isArray(foundCoord)) {
		findNumberGivenOneCoordinate(foundCoord) //at least find two proper numbers and push to the GEAR_PART_NUMS array
	}
}

function findNumberGivenOneCoordinate(foundCoord: Coordinates[]) {
	if (foundCoord.length > 1) {
		let foundParts: number[] = []

		for (const part of PARTS) {
			const charPart = part.num.toString()
			for (const coord of foundCoord) {
				if (
					charPart.includes(coord.char) &&
					part.row === coord.row &&
					isInCols(part.cols, coord.col)
				) {
					foundParts.push(part.num)
				}
			}
		}

		//removes duplicates
		foundParts = [...new Set(foundParts)]
		if (foundParts.length >= min) {
			if (GEAR_PART_NUMS.length > 60) console.log(foundParts)
			GEAR_PART_NUMS.push(foundParts.reduce((a, b) => a * b))
		}
	}
}

function isInCols(cols: { startCol: number; endCol: number }, col: number) {
	if (col >= cols.startCol && col <= cols.endCol) {
		return true
	}
	return false
}

function searchAroundAString(
	coord: Coordinates,
	regexp: RegExp,
	howManyMinimum = 1
) {
	const { char, row, col } = coord
	const foundCoord: Coordinates[] = []
	const endCol = col + char.length - 1

	//check left
	if (regexp.test(input[row][col - 1])) {
		foundCoord.push({ char: input[row][col - 1], row, col: col - 1 })
	}
	//check right
	if (regexp.test(input[row][endCol + 1])) {
		foundCoord.push({ char: input[row][endCol + 1], row, col: endCol + 1 })
	}
	//check above and below
	for (let nChar = col - 1; nChar <= endCol + 1; nChar++) {
		let charAbove = '.'
		let charBelow = '.'

		if (input[row - 1]) charAbove = input[row - 1][nChar]
		if (input[row + 1]) charBelow = input[row + 1][nChar]

		if (regexp.test(charAbove))
			foundCoord.push({ char: charAbove, row: row - 1, col: nChar })

		if (regexp.test(charBelow))
			foundCoord.push({ char: charBelow, row: row + 1, col: nChar })
	}

	if (foundCoord.length >= howManyMinimum) {
		if (howManyMinimum === 1) {
			return foundCoord[0]
		}
		return foundCoord
	}
	return //handled by Array.isArray(...)
}

const ENGINE_PARTS_SUM = PARTS.map(part => part.num).reduce((a, b) => a + b) // part 1
const GEAR_RATIO_SUM = GEAR_PART_NUMS.reduce((a, b) => a + b) // part 2

console.log('\nINPUT')
console.table(isDemo ? input : input.slice(-20))

// console.log('\nPARTS')
// console.table(isDemo ? PARTS : PARTS.slice(0, 20))

// console.log('\nSYMBOLS')
// console.table(isDemo ? SYMBOLS : SYMBOLS.slice(0, 20))

console.table(isDemo ? GEAR_PART_NUMS : GEAR_PART_NUMS.slice(-20))

console.log('\nAll engine parts combined make this number:', ENGINE_PARTS_SUM)
console.log('\nAll gear parts combined make this gear ratio:', GEAR_RATIO_SUM)

//88373022 too low (PART 2)
