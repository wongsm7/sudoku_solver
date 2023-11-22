let swapColumn = (board: Array<Array<string>>, i1: number, i2: number): void => {
    for (let i = 0; i < 9; i++) {
        let temp = board[i][i1]
        board[i][i1] = board[i][i2]
        board[i][i2] = temp
    }
}

let swapRow = (board: Array<Array<string>>, i1: number, i2: number): void => {
    for (let i = 0; i < 9; i++) {
        let temp = board[i1][i]
        board[i1][i] = board[i2][i]
        board[i2][i] = temp
    }
}

let swapNumber = (board: Array<Array<string>>, num1: number, num2: number): void => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == num1.toString()) {
                board[i][j] =  num2.toString()
            } else if (board[i][j] == num2.toString()) {
                board[i][j] = num1.toString()
            }
        }
    }
}

export { swapRow, swapColumn, swapNumber }