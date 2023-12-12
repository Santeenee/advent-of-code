import fs from 'fs'

const UNIVERSE = fs.readFileSync('./input.txt').toString()

const EMPTY_SPACE = "."
const GALAXY = "#" //change # into a number

function expandTheUniverse(universeMatrix: string[][]) {
  //TODO duplicate rows and cols
}


function findEmptyColsAndRows(rowsMatrix: string[][]) {
  const emptyRows: number[] = []

  const colsMatrix: string[][] = []
  const emptyCols: number[] = []

  function isEmpty(arr: string[]) {
    return arr.every(item => item === '.')
  }

  //fill EMPTY_ROWS array
  rowsMatrix.forEach((row, rowIndex) => {
    if (isEmpty(row)) emptyRows.push(rowIndex)
  })

  //fill colsMatrix
  rowsMatrix.forEach((row) => {
    row.forEach((char, charIndex) => {
      colsMatrix[charIndex] ?
        colsMatrix[charIndex].push(char) :
        colsMatrix[charIndex] = [char]
    })
  })

  //hoping it works
  colsMatrix.forEach((col, colIndex) => {
    if (isEmpty(col)) emptyCols.push(colIndex)
  })

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

  const matrix: string[][] = universeRows
    .map(row => row.split('')
      .filter(char => char === '.' || char === '#'))

  return matrix //8th item should be a galaxy
}


// * TESTING WITH LOGS :)
// console.log(UNIVERSE)
// console.log(simplerUniverse().slice(0, 3))
// console.table(simplerUniverse()[0])
// console.log(new Set(UNIVERSE))

console.log(findEmptyColsAndRows(simplerUniverse()))
