# SUBMISSION

## CHALLENGE

<https://adventofcode.com/2023/day/11>

> "Figure out the sum of the lengths of
> the shortest path between every pair of galaxies"
>
> "only 'empty rows and cols' double in size"
>
> "If there are 9 galaxies, there are 36 pairs.
> Only count each pair once;
> order within the pair doesn't matter.
> For each pair, find any shortest
> path between the two galaxies using only steps that move up, down, left,
> or right exactly one . or # at a time. (The shortest path between two
> galaxies is allowed to pass through another galaxy.)"
>
> "Expand the universe, then find the length of the shortest path
> between every pair of galaxies. What is the sum of these lengths?"

## BROKE DOWN TO

**A.** expand the universe()

- ✅ convert string universe in matrix universe
- ✅ find empty cols and rows
  - find empty rows
    - if each char in row is "." then store pointer of row.
  - same for columns
- ✅ duplicate empty rows and cols

**B.**

❌ generate pairs of galaxies -->
const pairs = [[g\*1, g\*2], [g\*1, g\*3], [g\*2, g\*3], etc.]

(didn't need to)

**C.**

✅ find shortest path (manhattan distance)

**D.**

✅ sum of shortest path (HOF `.reduce()`)

## UNDERSTADING

- each row is exactly 141 characters
- break line is OS dependent
- newline or carriage return knowledge thanks to [this stackoverflow answer](https://stackoverflow.com/questions/1761051/difference-between-n-and-r#answer-1761086)
- input.txt is a square?
- cloning a matrix is not that easy (slices upon slices of arrays... ok js 🌚)
- cartesian difference doesn't work. why? idk, im not a mathmatician. im dumb. that's it
- There's a thing called Manhattan distance... interesting. [This solved everything!](https://stackoverflow.com/a/22544595)

## Part 2

now the rows and columns of the 'universe' need to become 1million times larger. How my potato pc is going to handle this? No idea.

technically it works... it just needs to be heavily optimized
