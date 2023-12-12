import fs from 'fs'

const UNIVERSE = fs.readFileSync('./input.txt').toString()

const EMPTY_SPACE = "."
const GALAXY = "#" //change # into a number

const [COLS_UNIVERSE, ROWS_UNIVERSE] = simplerUniverse()

const [EMPTY_COLS, EMPTY_ROWS] = findEmptyColsAndRows()

function expandTheUniverse(universeMatrix: string[][]) {
  //TODO duplicate rows and cols
}


function findEmptyColsAndRows() {
  const emptyRows: number[] = []
  const emptyCols: number[] = []

  function isEmpty(arr: string[]) {
    return arr.every(item => item === EMPTY_SPACE)
  }

  ROWS_UNIVERSE.forEach((row, rowIndex) => {
    if (isEmpty(row)) emptyRows.push(rowIndex)
  })

  COLS_UNIVERSE.forEach((col, colIndex) => {
    if (isEmpty(col)) emptyCols.push(colIndex)
  })

  return [emptyCols, emptyRows]
}

function simplerUniverse() {
  //operating system indipendent approach to remove newlines
  let universeRows: string[] = []

  if (UNIVERSE.includes('\n')) {
    universeRows = UNIVERSE.split('\n')
  } else {
    universeRows = UNIVERSE.split('\r')
  }

  const rowsMatrix: string[][] = universeRows
    .map(row => row.split('')
      .filter(char => char === EMPTY_SPACE || char === GALAXY))

  const colsMatrix: string[][] = []

  rowsMatrix.forEach((row) => {
    row.forEach((char, charIndex) => {
      colsMatrix[charIndex] ?
        colsMatrix[charIndex].push(char) :
        colsMatrix[charIndex] = [char]
    })
  })

  return [colsMatrix, rowsMatrix] //rowsMatrix[7] should be a #
}


// * TESTING WITH LOGS :)
// console.log(UNIVERSE)
// console.log(simplerUniverse().slice(0, 3))
// console.table(simplerUniverse()[0])
// console.log(new Set(UNIVERSE))

console.log(EMPTY_COLS)
console.log(EMPTY_ROWS)


