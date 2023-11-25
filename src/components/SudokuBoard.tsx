import { useEffect } from 'react'
import './SudokuBoard.scss'
import SudokuCell from './SudokuCell'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/Store'
import { setCell, setFastPencil, setSelectedCellCol, setSelectedCellRow, setSelectedNumber } from '../features/SudokuSlice'
import { pushMove } from '../features/MoveStackSlice'
import Switch from '@mui/material/Switch';

const SudokuBoard = () => {
    let dispatch = useDispatch()
    let board: Array<Array<string>> = useSelector((state: RootState) => state.sudoku.board)
    let isFixedBoard: Array<Array<boolean>> = useSelector((state: RootState) => state.sudoku.isFixedBoard)
    let selectedCellRow = useSelector((state: RootState) => state.sudoku.selectedCellRow)
    let selectedCellCol = useSelector((state: RootState) => state.sudoku.selectedCellCol)
    let fastPencil = useSelector((state: RootState) => state.sudoku.fastPencil)
    let selectedNumber = useSelector((state: RootState) => state.sudoku.selectedNumber)

    let handleSwitchChange = () => {
        dispatch(setFastPencil(!fastPencil))
    }  

    useEffect(() => {
        if (fastPencil && !isFixedBoard[selectedCellRow][selectedCellCol] && selectedNumber != '') {
            dispatch(setCell({
                x: selectedCellRow,
                y: selectedCellCol,
                value: selectedNumber
            }))
        }

        const handleKeyPress = (event: any) => {
            let key = event.key
            if (key === 'Escape') {
                dispatch(setSelectedNumber(''))
                dispatch(setSelectedCellCol(-1))
                dispatch(setSelectedCellRow(-1))
            }

            if (isFixedBoard[selectedCellRow][selectedCellCol]) {
                return
            }

            if (key === "Backspace" || key === "Delete") {
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
                
                dispatch(setSelectedNumber(''))
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

                dispatch(setSelectedNumber(key.toString()))
            }
        };
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedCellCol, selectedCellRow]);

    return (
        <div>
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
                                                isFixed={isFixedBoard[rowIndex][colIndex]}
                                            />
                                        )
                                    })
                                }
                            </>
                        )
                    })
                }
                <div className='fast-pencil'>
                    <label>⚡️</label>
                    <Switch 
                        checked={fastPencil}
                        onChange={handleSwitchChange}
                    />
                </div>
            </div>
        </div>
    )
}

export default SudokuBoard