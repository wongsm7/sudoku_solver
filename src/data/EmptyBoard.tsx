let emptyBoard: Array<Array<string>> = [...Array(9)].map(() => Array(9).fill(''))

let cleanBoard: Array<Array<boolean>> = [...Array(9)].map(() => Array(9).fill(false))

export { emptyBoard, cleanBoard }