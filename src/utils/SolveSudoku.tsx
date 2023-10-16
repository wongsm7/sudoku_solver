let SolveSudoku = (board: Array<Array<String>>, x: number, y: number) : boolean => {
    // base case: all cell done
    if (x == board.length - 1 && y == board.length) {
        return true
    }

    // if reach last column of row, go to next row first column
    if (y == board.length) {
        return SolveSudoku(board, x + 1, 0)
    }

    // get current cell
    let currentCell = board[x][y]

    // if current cell filled, go next cell
    if (currentCell != "") {
        return SolveSudoku(board, x, y + 1)
    }

    // if current cell is empty, try putting in numbers
    for (let n = 1; n < 10; n++) {
        // check if num is valid
        if (isValid(board, x, y, n)) {
            board[x][y] = '' + n
            if (SolveSudoku(board, x , y + 1)) {
                return true
            }
        }
        board[x][y] = ""
    }
    return false

}

let isValid = (board: Array<Array<String>>, x: number, y: number, num: number) => {
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

export default SolveSudoku;