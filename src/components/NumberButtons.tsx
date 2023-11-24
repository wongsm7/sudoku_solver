import { useDispatch, useSelector } from 'react-redux'
import { setCell, setSelectedNumber } from '../features/SudokuSlice'
import { RootState } from '../app/Store'
import './NumberButtons.scss'
import { pushMove } from '../features/MoveStackSlice'

const NumberButtons = () => {
    let numberArray: Array<string> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear']

    let dispatch = useDispatch()
    let selectedCellRow = useSelector((state: RootState) => state.sudoku.selectedCellRow)
    let selectedCellCol = useSelector((state: RootState) => state.sudoku.selectedCellCol)
    let selectedNumber = useSelector((state: RootState) => state.sudoku.selectedNumber)
    let board: Array<Array<string>> = useSelector((state: RootState) => state.sudoku.board)

    let fillCellWithNumber = (value: string) => {
        if (value == 'Clear') {
            dispatch(setSelectedNumber(''))
        } else {
            dispatch(setSelectedNumber(value))
        }

        if (selectedCellRow == -1 || selectedCellCol == -1) {
            return
        }

        dispatch(setCell({
            x: selectedCellRow,
            y: selectedCellCol,
            value: value == 'Clear' ? '' : value
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
                    return (
                        <button className={`number-button ${selectedNumber == num && 'selected'}`} onClick={() => fillCellWithNumber(num)}>
                            {num}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default NumberButtons