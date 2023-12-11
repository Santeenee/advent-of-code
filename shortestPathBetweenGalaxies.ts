/* 
  SUBMISSION: 
    "Figure out the sum of the lengths of 
    the shortest path between every pair of galaxies"

    "only 'empty rows and cols' double in size"

    "If there are 9 galaxies, there are 36 pairs. 
    Only count each pair once; 
    order within the pair doesn't matter. 
    For each pair, find any shortest 
    path between the two galaxies using only steps that move up, down, left, 
    or right exactly one . or # at a time. (The shortest path between two 
    galaxies is allowed to pass through another galaxy.)"

    "Expand the universe, then find the length of the shortest path 
    between every pair of galaxies. What is the sum of these lengths?"

  BROKE DOWN TO:

  A. expand the universe()
    - ✅ convert string universe in matrix universe 
    - find empty cols and rows
      - find empty rows
        ▪ if each char in row is "." then store pointer of row.
      - same for columns
    - duplicate empty rows and cols

  B. pair of galaxies --> 
    const pairs = [[g*1, g*2], [g*1, g*3], [g*2, g*3], etc.]

  C. find shortes path
      
  D. sum of shortest path

  UNDERSTADING:
  each row is exactly 141 characters
  break line is OS dependent
*/

import fs from 'fs'

const UNIVERSE = fs.readFileSync('./input.txt').toString()

const EMPTY_SPACE = "."
const GALAXY = "#" //turn that into a number

const EMPTY_ROWS: number[] = []
const EMPTY_COLS: number[] = []

function expandTheUniverse(universeMatrix: string[][]) {
  //TODO duplicate rows and cols
}


function findEmptyColsAndRows(universeMatrix: string[][]) {


  return [emptyCols, emptyRows]
}

function simplerUniverse() {
  //operating system indipendent approach
  let universeRows: string[] = []

  if (UNIVERSE.includes('\n')) {
    universeRows = UNIVERSE.split('\n')
  } else {
    universeRows = UNIVERSE.split('\r')
  }

  const matrix: string[][] = universeRows.map(row => row.split('').filter(char => char === '.' || char === '#'))

  return matrix //8th item should be a galaxy
}


// * TESTING WITH LOGS (i'm such a noob, use a debugger man... yeah)
// console.log(UNIVERSE)
// console.log(simplerUniverse().slice(0, 3))
// console.table(simplerUniverse()[0])
// console.log(new Set(UNIVERSE))
console.table(simplerUniverse()[0])