// import fs from 'fs'

// const modifiedDoc = fs.readFileSync('input.txt').toString()

// const modifiedDoc = '1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet'
const modifiedDoc =
	'two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen'

const numMap = new Map<string, number>([
	['one', 1],
	['two', 2],
	['three', 3],
	['four', 4],
	['five', 5],
	['six', 6],
	['seven', 7],
	['eight', 8],
	['nine', 9],
])

//abusing higher order functions
const aDigit = /^\d$/
const CALIBRATION_DOCUMENT = modifiedDoc
	.split(
		modifiedDoc.includes('\n\r')
			? '\n\r'
			: modifiedDoc.includes('\n')
			? '\n'
			: '\r'
	)
	//now extract 0-9 digits from words and replace with actual num
	.map(line => convertWordsToNumbers(line))
	.map(line => line.split('').filter(char => aDigit.test(char))) //keep only numbers
	.map(line => +`${line[0]}${line[line.length - 1]}`) //keep only first and last numbers as two digit number
	.reduce((a, b) => a + b) //sum

function convertWordsToNumbers(line: string) {
	const arrLine = line.split('')

	for (const [numWord, num] of numMap) {
		const numIndex = line.indexOf(numWord)

		if (numIndex >= 0) {
			// console.log(line)
			arrLine.splice(numIndex, numWord.length, num.toString())
			// console.log(arrLine.join(''))
		}
	}
	return arrLine.toString()
}

console.table(CALIBRATION_DOCUMENT)
