let emptyBoard: Array<Array<string>> = [...Array(9)].map(() => Array(9).fill(''))

let unFixedBoard: Array<Array<boolean>> = [...Array(9)].map(() => Array(9).fill(false))

let noErrorBoard:Array<Array<boolean>> = [...Array(9)].map(() => Array(9).fill(false))

export { emptyBoard, unFixedBoard, noErrorBoard }