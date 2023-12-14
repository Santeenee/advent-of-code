import fs from 'fs'

const UNIVERSE = fs.readFileSync('./input.txt').toString()
// const UNIVERSE = '#...\n....\n....\n...#';

const EMPTY_SPACE = "."
const GALAXY = "#" //change # into a number

const [COLS_UNIVERSE, ROWS_UNIVERSE] = simplerUniverse()

const [EMPTY_COLS, EMPTY_ROWS] = findEmptyColsAndRows()

const EXPANDED_UNIVERSE = expandTheUniverse()

const RESULT = sumDistances()


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

function isEmpty(row: string[]) {
  return row.every(char => char !== GALAXY)
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

function sumDistances() {
  const coordinates: number[][] = []
  const distances: number[] = []


  // * NUMERATE GALAXIES
  // let galaxyCount = 0
  // EXPANDED_UNIVERSE.forEach(row => {
  //   row.forEach((char, nChar) => {
  //     if (char === GALAXY) {
  //       row[nChar] = String.fromCharCode(galaxyCount + 97) // '#' becomes a char
  //       galaxyCount++
  //     }
  //   })
  // })

  // * FIND & COLLECT PAIRS
  // EXPANDED_UNIVERSE.forEach(row => {
  //   row.forEach(char => {

  //   })
  // })

  //* store pointers of galaxies
  EXPANDED_UNIVERSE.forEach((row, nRow) => {
    row.forEach((char, nChar) => {
      if (char === GALAXY) coordinates.push([nRow, nChar])
    })
  })

  console.log(coordinates)

  for (let aGalaxy = 0; aGalaxy < coordinates.length - 1; aGalaxy++) {
    for (let bGalaxy = aGalaxy + 1; bGalaxy < coordinates.length; bGalaxy++) {
      const a = coordinates[aGalaxy]
      const b = coordinates[bGalaxy]

      //! it doesn't work well...
      // const distance = Math.ceil(Math.sqrt((b[0] ** 2 - a[0] ** 2) + (b[1] ** 2 - a[1] ** 2)))
      // const distance = Math.ceil(Math.hypot((b[0] - a[0], b[1] - a[1])))

      const distance = getDistance(a, b)

      distances.push(distance)
      console.log(`getDistance(${b}, ${a}) = ${distance}`)
    }
  }

  return distances.reduce((a, b) => a + b)
}

function getDistance([aX, aY]: number[], [bX, bY]: number[]) {
  //no... cartesian distance isn't enough
  //must travel non diagonally... HOW

  const distance = 0

  //TODO... think about it

  return distance
}


// * TESTING WITH LOGS :)

console.table(ROWS_UNIVERSE.map(row => row.join('')))
console.table(EXPANDED_UNIVERSE.map(row => row.join(''))) //+8 rows, +11 cols

console.table(RESULT)