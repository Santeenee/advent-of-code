import fs from 'fs'

const UNIVERSE = fs.readFileSync('./input.txt').toString()

const EMPTY_SPACE = "."
const GALAXY = "#" //change # into a number

const [COLS_UNIVERSE, ROWS_UNIVERSE] = simplerUniverse()

const [EMPTY_COLS, EMPTY_ROWS] = findEmptyColsAndRows()

const EXPANDED_UNIVERSE = expandTheUniverse()


function expandTheUniverse() {

  //because splice() mutates arrays in place, we need to have a copy
  const universeInExpansion = ROWS_UNIVERSE.map(row => row.slice()).slice()

  //* DUPLICATE EMPTY COLUMNS
  let colOffset = 1
  for (let nCol = 0; nCol < EMPTY_COLS.length; nCol++) {
    universeInExpansion.forEach(row => {
      row.splice(EMPTY_COLS[nCol] + colOffset, 0, EMPTY_SPACE)
    })
    colOffset++
  }

  const emptyRow = universeInExpansion[EMPTY_ROWS[0]]

  //* DUPLICATE EMPTY ROWS
  let rowOffset = 1
  for (let nRow = 0; nRow < EMPTY_ROWS.length; nRow++) {
    universeInExpansion.splice(EMPTY_ROWS[nRow] + rowOffset, 0, emptyRow)
    rowOffset++
  }

  return universeInExpansion
}

function isEmpty(arr: string[]) {
  return arr.every(item => item === EMPTY_SPACE)
}

function findEmptyColsAndRows() {
  const emptyRows: number[] = []
  const emptyCols: number[] = []

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

console.log('EMPTY COLS INDEXES');
console.log(EMPTY_COLS.join() + '\n')

console.log('EMPTY ROWS INDEXES');
console.log(EMPTY_ROWS.join() + '\n')

// console.log('empty cols')
// // console.table(EXPANDED_UNIVERSE)
// EMPTY_COLS.forEach(colIndex => {
//   const currCol: string[] = [""]
//   EXPANDED_UNIVERSE.forEach(row => {
//     const indess = colIndex + 1
//     currCol.push(row[indess])
//   })
//   console.log(currCol.join(""))
// })
// console.table(EXPANDED_UNIVERSE[0])

// console.log(UNIVERSE)
console.table(ROWS_UNIVERSE.map(row => row.join('')))
console.table(EXPANDED_UNIVERSE.map(row => row.join(''))) //+8 rows, +11 cols
