let swapColumn = (board: Array<Array<String>>, i1: number, i2: number): void => {
    for (let i = 0; i < 9; i++) {
        let temp = board[i][i1]
        board[i][i1] = board[i][i2]
        board[i][i2] = temp
    }
}

let swapRow = (board: Array<Array<String>>, i1: number, i2: number): void => {
    for (let i = 0; i < 9; i++) {
        let temp = board[i1][i]
        board[i1][i] = board[i2][i]
        board[i2][i] = temp
    }
}

let swapNumber = (board: Array<Array<String|number>>, num1: number, num2: number): void => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == num1) {
                board[i][j] = num2
            } else if (board[i][j] == num2) {
                board[i][j] = num1
            }
        }
    }
}

export { swapRow, swapColumn, swapNumber }