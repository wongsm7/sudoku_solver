import React, { useEffect, useState } from 'react'
import './SudokuBoard.css'
import SudokuCell from './SudokuCell'
import SolveSudoku from '../utils/SolveSudoku'
import CheckSudoku from '../utils/CheckSudoku'

type Props = {}

const SudokuBoard = (props: Props) => {
    // let emptyBoard = Array.from({length: 9}, e => Array(9).fill(''));
    let emptyBoard = [...Array(9)].map(e => Array(9).fill(''))
    let [board, setBoard] = useState(emptyBoard)
    let [status, setStatus] = useState(CheckSudoku(board))

    let [isValidBoard, setIsValidBoard] = useState(false)

    let checkBoard = () => {
        setStatus(CheckSudoku(board))
    }

    useEffect(() => {
        checkBoard()
    }, [board])

    let solveBoard = () => {
        let tempBoard = [...board]
        SolveSudoku(tempBoard, 0, 0)
        setBoard(tempBoard)
    }

    let resetBoard = () => {
      setBoard(emptyBoard)
    }

    return (
        <>
            <div className='sudoku-container'>
                {
                    board.map((row, rowIndex) => {
                        return (
                            <>
                                <div>
                                    {
                                        row.map((cell, colIndex) => {
                                            return (
                                                <SudokuCell 
                                                    value={cell} 
                                                    rowIndex={rowIndex} 
                                                    colIndex={colIndex} 
                                                    setBoard={setBoard}
                                                    board={board}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </div>
            <div className='right-panel'>
                <div className='status'>
                    {status}
                </div>
                <div className='buttons'>
                    <button onClick={solveBoard}>
                        Solve sudoku
                    </button>
                    <button onClick={resetBoard}>
                        Reset sudoku
                    </button>
                </div>
            </div>
        </>
    )
}

export default SudokuBoard