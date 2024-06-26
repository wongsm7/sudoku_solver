import { completedBoard } from "../data/CompletedBoard"
import { cleanBoard } from "../data/EmptyBoard"
import { randomNumber, sample } from "./RandomUtils"
import { swapColumn, swapRow, swapNumber } from "./SwapUtils"

const isValidSudoku = (board: Array<Array<string>>): boolean => {
    for (let i = 0; i < 9; i++) {
        let rowSet = new Set()
        let columnSet = new Set()
        let boxSet = new Set()
        for (let j = 0; j < 9; j++) {
            let rowCell = board[i][j]
            let columnCell = board[j][i]
            let boxCell = board[3 * Math.floor(i / 3) + Math.floor(j / 3)][((i * 3) % 9) + (j % 3)]

            if (rowSet.has(rowCell) || columnSet.has(columnCell) || boxSet.has(boxCell)) {
                return false
            }

            rowCell !== '' && rowSet.add(rowCell)
            columnCell !== '' && columnSet.add(columnCell)
            boxCell !== '' && boxSet.add(boxCell)
        }
    }

    return true
}

const isCompletedSudoku = (board: Array<Array<string>>): boolean => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == '') {
                return false
            }
        }
    }
    return true
}

const checkSudoku = (board: Array<Array<string>>): string => {
    if (isCompletedSudoku(board) && isValidSudoku(board)) {
        return "Completed successfully"
    } else if (!isValidSudoku(board)) {
        return "Invalid sudoku"
    } else if (!isCompletedSudoku(board)) {
        return "Incomplete sudoku"
    } else {
        return 'Error occured'
    }
}

let solveSudoku = (board: Array<Array<string>>, x: number, y: number): boolean => {
    // base case: all cell done
    if (x == board.length - 1 && y == board.length) {
        return true
    }

    // if reach last column of row, go to next row first column
    if (y == board.length) {
        return solveSudoku(board, x + 1, 0)
    }

    // get current cell
    let currentCell = board[x][y]

    // if current cell filled, go next cell
    if (currentCell != "") {
        return solveSudoku(board, x, y + 1)
    }

    // if current cell is empty, try putting in numbers
    for (let n = 1; n < 10; n++) {
        // check if num is valid
        if (isValid(board, x, y, n)) {
            board[x][y] = n.toString()
            if (solveSudoku(board, x, y + 1)) {
                return true
            }
        }
        board[x][y] = ""
    }
    return false

}

let isValid = (board: Array<Array<string>>, x: number, y: number, num: number) => {
    // check column
    for (let i = 0; i < board.length; i++) {
        if (board[x][i] == num.toString()) {
            return false
        }
    }
    // check row
    for (let j = 0; j < board.length; j++) {
        if (board[j][y] == num.toString()) {
            return false
        }
    }

    // check box
    let startRow = x - (x % 3)
    let startCol = y - (y % 3)
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] == num.toString()) {
                return false
            }
        }
    }

    return true
}

let clueMapper: any = {
    1: 41,
    2: 33,
    3: 28,
    4: 18,
}

let generateSudoku = (difficulty: number) => {
    let board = [...completedBoard].map(row => [...row])
    //solveSudoku(board, 0, 0)
    // swap columns
    for (let i = 0; i < 9; i += 3) {
        swapColumn(board, randomNumber(i, i + 2), randomNumber(i, i + 2))
    }

    // swap rows
    for (let i = 0; i < 9; i += 3) {
        swapRow(board, randomNumber(i, i + 2), randomNumber(i, i + 2))
    }

    // swap numbers
    for (let i = 0; i < 9; i++) {
        swapNumber(board, randomNumber(1, 9), randomNumber(1, 9))
    }

    // remove numbers

    let cells = sample([...Array(81).keys()], 81 - clueMapper[difficulty])
    cells.forEach(cell => {
        board[Math.floor(cell / 9)][cell % 9] = ''
    })
    return board
}

let generateFixedBoard = (board: Array<Array<string>>) => {
    let isFixedBoard = [...cleanBoard].map(row => [...row])
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] != '') {
            isFixedBoard[i][j] = true
          }
        }
    }
    return isFixedBoard
}

let getCountLeftFromBoard = (board: Array<Array<string>>, isErrorBoard: Array<Array<boolean>>, number: string) => {
    let count = 0
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (board[i][j] == number && !isErrorBoard[i][j]) {
            count++
          }
        }
    }
    return 9 - count
}

export { checkSudoku, isValidSudoku, solveSudoku, generateSudoku, generateFixedBoard, getCountLeftFromBoard }