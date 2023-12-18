// TODO solve the AoC challenge of the day
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

// * TYPES
type Part = {
	num: number
	row: number
	cols: { startCol: number; endCol: number }
}

type Symbol = { char: string; row: number; col: number }

// * DATA
const PARTS: Part[] = []
const SYMBOLS: Symbol[] = []

const numbersRegexp = /\d+/g
const symbolRegexp = /(?!\.)\W/g

// * LOOPIN' FOREVAH
input.forEach((line, nLine) => {
	const numsIndexesArr: number[] = []
	let nCount = 0

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

console.log('\nINPUT')
console.table(input)

console.log('\nPARTS')
console.table(PARTS)

console.log('\nSYMBOLS')
console.table(SYMBOLS)
