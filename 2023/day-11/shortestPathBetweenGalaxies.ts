import fs from 'fs'

const UNIVERSE = fs.readFileSync('./input.txt').toString()
// const UNIVERSE = '...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....';

const EMPTY_SPACE = "."
const GALAXY = "#" //change # into a number

const [COLS_UNIVERSE, ROWS_UNIVERSE] = simplerUniverse(UNIVERSE)

const [EMPTY_COLS, EMPTY_ROWS] = findEmptyColsAndRows()

const GALAXIES = getGalaxies(ROWS_UNIVERSE)

const EXPANDED_GALAXIES_1mil = smarterUniverseExpansion(1_000_000, GALAXIES)
const EXPANDED_GALAXIES_2 = smarterUniverseExpansion(2, GALAXIES)
//no actual need to expand the universe!
const RESULT = sumDistances(EXPANDED_GALAXIES_2)
const RESULT_2 = sumDistances(EXPANDED_GALAXIES_1mil)

// -------------------------------------------------------------

function smarterUniverseExpansion(expansionRate = 2, galaxiesMatrix: number[][]) {
  //take 1 galaxy at a time, see which empty cols are left of that galaxy.
  //add 999999 * nEMTPY_COLUMNS to x galaxy coordinate

  //deep copy galaxiesMatrix
  const galaxies = galaxiesMatrix.map(item => item.slice()).slice()

  galaxies.forEach(([x, y], nGalaxy) => {
    const nFilteredEmptyCols = EMPTY_COLS.filter(col => col < x).length
    const nFilteredEmptyRows = EMPTY_ROWS.filter(row => row < y).length

    galaxies[nGalaxy][0] += ((expansionRate - 1) * nFilteredEmptyCols)
    galaxies[nGalaxy][1] += ((expansionRate - 1) * nFilteredEmptyRows)
  })

  return galaxies
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

function sumDistances(galaxies: number[][]) {
  const distances: number[] = []

  for (let aGalaxy = 0; aGalaxy < galaxies.length - 1; aGalaxy++) {
    for (let bGalaxy = aGalaxy + 1; bGalaxy < galaxies.length; bGalaxy++) {
      const a = galaxies[aGalaxy]
      const b = galaxies[bGalaxy]

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

function getGalaxies(a_universe: string[][]) {
  const galaxies: number[][] = []
  //* store pointers of galaxies
  a_universe.forEach((row, nRow) => {
    row.forEach((char, nChar) => {
      if (char === GALAXY) galaxies.push([nChar, nRow])
    })
  })

  return galaxies
}

function getManhattanDistance([aX, aY]: number[], [bX, bY]: number[]) {
  return Math.abs(bX - aX) + Math.abs(bY - aY)
}


// * TESTING WITH LOGS :)

// console.table(ROWS_UNIVERSE.map(row => row.join('')))
// console.table(EXPANDED_UNIVERSE.map(row => row.join('')))
// console.table(DINAMIC_EXPANDED_UNIVERSE.map(row => row.join(''))) //+8 rows, +11 cols

console.log('\nPART 1')
console.log(`The sum af all distances among galaxies is ${RESULT}`)

console.log('\nPART 2')
console.log(`The sum af all distances among galaxies is ${RESULT_2} \\(@^0^@)/`)
