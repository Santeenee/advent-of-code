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

