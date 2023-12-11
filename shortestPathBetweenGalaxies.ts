import fs from 'fs'

const UNIVERSE = fs.readFileSync('./input.txt').toString()

const EMPTY_SPACE = "."
const GALAXY = "#" //change # into a number

const EMPTY_ROWS: number[] = []
const EMPTY_COLS: number[] = []

function expandTheUniverse(universeMatrix: string[][]) {
  //TODO duplicate rows and cols
}


function findEmptyColsAndRows(universeMatrix: string[][]) {


  //return [emptyCols, emptyRows]
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


// * TESTING WITH LOGS :)
// console.log(UNIVERSE)
// console.log(simplerUniverse().slice(0, 3))
// console.table(simplerUniverse()[0])
// console.log(new Set(UNIVERSE))
console.table(simplerUniverse()[0])