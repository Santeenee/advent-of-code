import fs from 'fs'
import splitNewLine from '../../utils/splitNewLine'

// const modifiedDoc = fs.readFileSync('input.txt').toString()
// const modifiedDoc =
// 	'tsxbfgzhjr55seventhreesxnnjhninefive\nnine36five1onefive\neighteightwoneoneight'

// const modifiedDoc = '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet'
const modifiedDoc =
	'two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen'

// why these weird combinations?
// If you have 'eightwo', for some reason, it is supposed to return 82
// so, appending a letter might fix it... let's try
// example: 'eighthree' -> '8t'+'hree' -> '8three' -> '83'
const numMap = new Map<string, string>([
	['one', 'o1e'],
	['two', 't2o'],
	['three', 't3e'],
	['four', 'f4r'], //random char M
	['five', 'f5e'],
	['six', 's6x'],
	['seven', 's7n'],
	['eight', 'e8t'],
	['nine', 'n9e'],
])

//abusing higher order functions
const aDigit = /^\d$/
const calibratedSum = splitNewLine(modifiedDoc)
	.map(line => convertWordsToNumbers(line))
	.map(line => line.split('').filter(char => aDigit.test(char))) //keep only numbers
	.map(line => +`${line[0]}${line[line.length - 1]}`) //keep only first and last numbers as two digit number
	.reduce((a, b) => a + b) //sum

function convertWordsToNumbers(line: string) {
	const arrLine = line.split('')

	// console.log(arrLine.join(''), '-')
	for (const [numWord, num] of numMap) {
		const wordIndexes: number[] = []
		for (let i = 0; i < arrLine.length; i++) {
			if (line.slice(i, i + numWord.length) === numWord) {
				wordIndexes.push(i) //! wordIndexes aren't updated real time
			}
		}

		if (wordIndexes.length > 0) {
			let offset = 0
			for (let i = 0; i < wordIndexes.length; i++) {
				//updates found index
				const foundWordIndex = arrLine.join('').indexOf(numWord, offset)

				// replace word with number
				arrLine.splice(foundWordIndex, numWord.length, ...num)
				// console.log(arrLine.join(''))
				offset = foundWordIndex + 1
			}
		}
	}
	// console.log(arrLine.filter(char => aDigit.test(char)).join(''), '*')

	return arrLine.join('')
}

// console.table(splitNewLine(modifiedDoc))
console.table(calibratedSum)
// console.table(calibratedSum.slice(0, 5))
// console.table(calibratedSum.slice(-1))
