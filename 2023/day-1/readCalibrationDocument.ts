import fs from 'fs'
import splitNewLine from '../../utils/splitNewLine'

const modifiedDoc = fs.readFileSync('input.txt').toString()
// const modifiedDoc =
// 	'tsxbfgzhjr55seventhreesxnnjhninefive\nnine36five1onefive\neighteightwoneoneightwoneight' //!first line doesn't work... why?

// const modifiedDoc = '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet'
// const modifiedDoc =
// 	'two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen' //281

// const modifiedDoc = 'tsxbfgzhjr55seventhreesxnnjhninefive'

// why these weird combinations?
// If you have 'eightwo', for some reason, it is supposed to return 82
// so, appending a letter might fix it... let's try
// example: 'eighthree' -> 'eightthree' -> 'eight3' -> '83'
const numMap = new Map<string, string>([
	//duplicate shared character
	['oneight', 'oneeight'],
	['twone', 'twoone'],
	['threeight', 'threeeight'],
	['fiveight', 'fiveeight'],
	['sevenine', 'sevennine'],
	['eightwo', 'eighttwo'],
	['eighthree', 'eightthree'],
	['nineight', 'nineeight'],
	//convert string in num
	['one', '1'],
	['two', '2'],
	['three', '3'],
	['four', '4'],
	['five', '5'],
	['six', '6'],
	['seven', '7'],
	['eight', '8'],
	['nine', '9'],
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

		//number of occurrences of a word in the line
		for (let i = 0; i < arrLine.length; i++) {
			if (arrLine.join('').slice(i, i + numWord.length) === numWord) {
				wordIndexes.push(i)
			}
		}

		if (wordIndexes.length > 0) {
			let offset = 0
			for (let i = 0; i < wordIndexes.length; i++) {
				//updates found index
				const foundWordIndex = arrLine.join('').indexOf(numWord, offset)

				// replace word with number
				arrLine.splice(foundWordIndex, numWord.length, ...num)
				offset = foundWordIndex + 1
			}
		}
	}
	// console.log(arrLine.filter(char => aDigit.test(char)).join(''), '*')

	return arrLine.join('')
}

console.table(calibratedSum)
