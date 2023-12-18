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

// * DATA
const PARTS: Part[] = []
const SYMBOLS: Symbol[] = []

const numbersRegexp = /\d+/g
const symbolRegexp = /(?!\.)\W/g
const onlySymbolRegexp = /^(?!\.)\W$/

// * CODE
// get all PARTS and SYMBOLS
input.forEach((line, nLine) => {
	const numbers = [...line.matchAll(numbersRegexp)]
	numbers.forEach(matched => {
		if (matched.length > 0) {
			PARTS.push({
				num: +matched[0],
				row: nLine,
				cols: {
					startCol: matched['index']!,
					endCol: matched['index']! + matched[0].length - 1,
				},
			})
		}
	})

	const symbols = [...line.matchAll(symbolRegexp)]
	symbols.forEach(matched => {
		if (matched.length > 0) {
			SYMBOLS.push({
				char: matched[0],
				row: nLine,
				col: matched['index']!,
			})
		}
	})
})

//remove non engine parts
for (let nPart = 0; nPart < PARTS.length; nPart++) {
	const part = PARTS[nPart]

	const { row, cols } = part
	let isEnginePart = false

	//check all surroundings
	//check above
	//check left and right
	//check below
	//if none of these 4, then splice(x, 1)

	//check left
	if (onlySymbolRegexp.test(input[row][cols.startCol - 1])) {
		isEnginePart = true
	}
	//check right
	if (onlySymbolRegexp.test(input[row][cols.endCol + 1])) {
		isEnginePart = true
	}
	//check above and below
	for (let nChar = cols.startCol - 1; nChar <= cols.endCol + 1; nChar++) {
		let charAbove = '.'
		let charBelow = '.'

		if (input[row - 1]) charAbove = input[row - 1][nChar]
		if (input[row + 1]) charBelow = input[row + 1][nChar]

		if (onlySymbolRegexp.test(charAbove)) isEnginePart = true
		if (onlySymbolRegexp.test(charBelow)) isEnginePart = true
	}

	//DELETE part because it's not an engine part
	if (!isEnginePart) {
		console.log('Non engine part', part)
		PARTS.splice(nPart, 1)
		nPart--
	}
}

const RESULT = PARTS.map(part => part.num).reduce((a, b) => a + b)

console.log('\nINPUT')
console.table(isDemo ? input : input.slice(0, 20))

console.log('\nPARTS')
console.table(isDemo ? PARTS : PARTS.slice(0, 20))

console.log('\nSYMBOLS')
console.table(isDemo ? SYMBOLS : SYMBOLS.slice(0, 20))

console.log('\nAll engine parts combined make this number:', RESULT)

//564199 too high
