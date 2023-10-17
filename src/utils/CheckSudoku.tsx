const isValidSudoku = (board: Array<Array<String>>): boolean => {
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

const isCompletedSudoku = (board: Array<Array<String>>): boolean => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == '') {
                return false
            }
        }
    }
    return true
}

const CheckSudoku = (board: Array<Array<String>>): String => {
    if (isCompletedSudoku(board) && isValidSudoku(board)) {
        return "Completed successfully"
    } else if (!isValidSudoku(board)) {
        return "Invalid sudoku"
    } else if (!isCompletedSudoku(board)) {
        return "Incomplete sudoku"
    }
}

export default CheckSudoku