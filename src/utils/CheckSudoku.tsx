const CheckSudoku = (board: Array<Array<String>>): boolean => {
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

            rowCell !== '.' && rowSet.add(rowCell)
            columnCell !== '.' && columnSet.add(columnCell)
            boxCell !== '.' && boxSet.add(boxCell)
        }
    }

    return true
}

export default CheckSudoku