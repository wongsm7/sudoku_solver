import { useEffect } from 'react'
import './SudokuBoard.scss'
import SudokuCell from './SudokuCell'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/Store'
import { setCell, setSelectedCellCol, setSelectedCellRow, setSelectedNumber } from '../features/SudokuSlice'
import { pushMove } from '../features/MoveStackSlice'

const SudokuBoard = () => {
    let dispatch = useDispatch()
    let board: Array<Array<string>> = useSelector((state: RootState) => state.sudoku.board)
    let selectedCellRow = useSelector((state: RootState) => state.sudoku.selectedCellRow)
    let selectedCellCol = useSelector((state: RootState) => state.sudoku.selectedCellCol)

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            let key = event.key
            if (key === 'Escape') {
                dispatch(setSelectedNumber(''))
                dispatch(setSelectedCellCol(-1))
                dispatch(setSelectedCellRow(-1))
            }

            if (key === "Backspace" || key === "Delete") {
                dispatch(setCell({
                    x: selectedCellRow,
                    y: selectedCellCol,
                    value: ''
                }))
            }

            if (/^[1-9]$/i.test(key)) {
                dispatch(pushMove({
                    x: selectedCellRow,
                    y: selectedCellCol,
                    value: board[selectedCellRow][selectedCellCol]
                }))

                dispatch(setCell({
                    x: selectedCellRow,
                    y: selectedCellCol,
                    value: key.toString()
                }))

            }
        };
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedCellCol, selectedCellRow]);

    return (
        <div className='sudoku-board'>
            {
                board.map((row, rowIndex) => {
                    return (
                        <>
                            {
                                row.map((cell, colIndex) => {
                                    return (
                                        <SudokuCell
                                            value={cell}
                                            rowIndex={rowIndex}
                                            colIndex={colIndex}
                                        />
                                    )
                                })
                            }
                        </>
                    )
                })
            }
        </div>
    )
}

export default SudokuBoard