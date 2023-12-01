import { useDispatch, useSelector } from 'react-redux'
import { setCell, setSelectedNumber } from '../features/SudokuSlice'
import { RootState } from '../app/Store'
import './NumberButtons.scss'
import { pushMove } from '../features/MoveStackSlice'
import { getCountLeftFromBoard } from '../utils/SudokuUtils'

const NumberButtons = () => {
    let numberArray: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

    let dispatch = useDispatch()
    let selectedCellRow = useSelector((state: RootState) => state.sudoku.selectedCellRow)
    let selectedCellCol = useSelector((state: RootState) => state.sudoku.selectedCellCol)
    let selectedNumber = useSelector((state: RootState) => state.sudoku.selectedNumber)
    let board: Array<Array<string>> = useSelector((state: RootState) => state.sudoku.board)
    let isFixedBoard: Array<Array<boolean>> = useSelector((state: RootState) => state.sudoku.isFixedBoard)
    let isErrorBoard = useSelector((state: RootState) => state.sudoku.isErrorBoard)

    let fillCellWithNumber = (value: string) => {
        dispatch(setSelectedNumber(value))

        if (selectedCellRow == -1 || selectedCellCol == -1) {
            return
        }

        if (isFixedBoard[selectedCellRow][selectedCellCol]) {
            return
        }

        dispatch(setCell({
            x: selectedCellRow,
            y: selectedCellCol,
            value: value
        }))

        dispatch(pushMove({
            x: selectedCellRow,
            y: selectedCellCol,
            value: board[selectedCellRow][selectedCellCol]
        }))

    }

    let clearCell = () => {
        if (selectedCellRow == -1 || selectedCellCol == -1) {
            return
        }

        if (isFixedBoard[selectedCellRow][selectedCellCol]) {
            return
        }

        dispatch(setCell({
            x: selectedCellRow,
            y: selectedCellCol,
            value: ''
        }))

        dispatch(pushMove({
            x: selectedCellRow,
            y: selectedCellCol,
            value: board[selectedCellRow][selectedCellCol]
        }))
    }

    return (
        <div className='number-buttons'>
            {
                numberArray.map((num) => {
                    let countLeft = getCountLeftFromBoard(board, isErrorBoard, num)
                    return (
                        <button 
                            className={`number-button ${selectedNumber == num && 'selected'} ${countLeft <= 0 && 'hidden'}`} 
                            onClick={() => fillCellWithNumber(num)}
                            key={num}
                        >
                            {num}
                        </button>
                    )
                })
            }
            <button className={`clear-button`} onClick={() => clearCell()}>
                Clear
            </button>
        </div>
    )
}

export default NumberButtons