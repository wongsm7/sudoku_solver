import React, { useState } from 'react'
import './SudokuBoard.css'
import SudokuCell from './SudokuCell'
import SolveSudoku from '../utils/SolveSudoku'
import Header from './Header'

type Props = {}

const SudokuBoard = (props: Props) => {
    let [board, setBoard] = useState([
        [
          '', '', '', '', '',
          '', '', '', ''
        ],
        [
          '', '', '', '', '',
          '', '', '', ''
        ],
        [
          '', '', '', '', '',
          '', '', '', ''
        ],
        [
          '', '', '', '', '',
          '', '', '', ''
        ],
        [
          '', '', '', '', '',
          '', '', '', ''
        ],
        [
          '', '', '', '', '',
          '', '', '', ''
        ],
        [
          '', '', '', '', '',
          '', '', '', ''
        ],
        [
          '', '', '', '', '',
          '', '', '', ''
        ],
        [
          '', '', '', '', '',
          '', '', '', ''
        ]
      ])

    let [isValidBoard, setIsValidBoard] = useState(false)

    let solveBoard = () => {
        let tempBoard = [...board]
        SolveSudoku(tempBoard, 0, 0)
        setBoard(tempBoard)
    }

    let checkBoard = () => {

    }
    return (
        <>
            <Header />
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
            <div className='buttons'>
                <button onClick={solveBoard}>
                    Solve sudoku
                </button>
                <button onClick={checkBoard}>
                    Check sudoku
                </button>
            </div>
        </>
    )
}

export default SudokuBoard