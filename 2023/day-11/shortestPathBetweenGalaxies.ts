import fs from 'fs'

// const UNIVERSE = fs.readFileSync('./input.txt').toString()
const UNIVERSE = '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....';

const EMPTY_SPACE = "."
const GALAXY = "#" //change # into a number

const [COLS_UNIVERSE, ROWS_UNIVERSE] = simplerUniverse(UNIVERSE)

const [EMPTY_COLS, EMPTY_ROWS] = findEmptyColsAndRows()

// const EXPANDED_UNIVERSE = expandTheUniverse()

// const RESULT = sumDistances(EXPANDED_UNIVERSE)

// end part 1, start part 2

const DINAMIC_EXPANDED_UNIVERSE = expandTheUniverse(1_000_000)

const RESULT_2 = sumDistances(DINAMIC_EXPANDED_UNIVERSE)

// -------------------------------------------------------------


function expandTheUniverse(expansionRate = 2) {
  const linesToAdd = expansionRate - 1

  //because splice() mutates arrays in place, we need to have a copy
  const universeInExpansion = ROWS_UNIVERSE.map(row => row.slice()).slice()

  //* EXPAND EMPTY COLUMNS
  const emptySpacesToAdd = '.'.repeat(linesToAdd)
  let colOffset = 0

  for (let nCol = 0; nCol < EMPTY_COLS.length; nCol++) {
    universeInExpansion.forEach(row => {
      row.splice(EMPTY_COLS[nCol] + 1 + colOffset, 0, ...emptySpacesToAdd)
    })
    colOffset += linesToAdd
  }

  //* EXPAND EMPTY ROWS
  const emptyRow = universeInExpansion[EMPTY_ROWS[0]]

  const emptyRowsToAdd: string[][] = []

  for (let i = 0; i < linesToAdd; i++)
    emptyRowsToAdd.push(emptyRow)

  let rowOffset = 0
  for (let nRow = 0; nRow < EMPTY_ROWS.length; nRow++) {
    universeInExpansion.splice(EMPTY_ROWS[nRow] + 1 + rowOffset, 0, ...emptyRowsToAdd)
    rowOffset += linesToAdd
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

function simplerUniverse(universe: string) {
  //operating system indipendent approach to remove newlines
  let universeRows: string[] = []

  if (universe.includes('\n')) {
    universeRows = universe.split('\n')
  } else {
    universeRows = universe.split('\r')
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

function sumDistances(complete_universe: string[][]) {
  const coordinates: number[][] = []
  const distances: number[] = []

  //* store pointers of galaxies
  complete_universe.forEach((row, nRow) => {
    row.forEach((char, nChar) => {
      if (char === GALAXY) coordinates.push([nRow, nChar])
    })
  })

  for (let aGalaxy = 0; aGalaxy < coordinates.length - 1; aGalaxy++) {
    for (let bGalaxy = aGalaxy + 1; bGalaxy < coordinates.length; bGalaxy++) {
      const a = coordinates[aGalaxy]
      const b = coordinates[bGalaxy]

      //! it doesn't work well...
      // const distance = Math.ceil(Math.sqrt((b[0] ** 2 - a[0] ** 2) + (b[1] ** 2 - a[1] ** 2)))
      // const distance = Math.ceil(Math.hypot((b[0] - a[0], b[1] - a[1])))

      const distance = getManhattanDistance(a, b)

      distances.push(distance)
      // console.log(`getManhattanDistance(${b}, ${a}) = ${distance}`)
    }
  }

  return distances.reduce((a, b) => a + b)
}

function getManhattanDistance([aX, aY]: number[], [bX, bY]: number[]) {
  return Math.abs(bX - aX) + Math.abs(bY - aY)
}


// * TESTING WITH LOGS :)

// console.table(ROWS_UNIVERSE.map(row => row.join('')))
// console.table(EXPANDED_UNIVERSE.map(row => row.join('')))
// console.table(DINAMIC_EXPANDED_UNIVERSE.map(row => row.join(''))) //+8 rows, +11 cols

// console.log('\nPART 1')
// console.log(`The sum af all distances among galaxies is ${RESULT} \\(@^0^@)/`)

console.log('\nPART 2')
console.log(`The sum af all distances among galaxies is ${RESULT_2} \\(@^0^@)/`)
