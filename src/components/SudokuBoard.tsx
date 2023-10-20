import React, { useEffect, useState } from 'react'
import './SudokuBoard.css'
import SudokuCell from './SudokuCell'
import { isValidSudoku, solveSudoku, checkSudoku } from '../utils/SudokuUtils'
import Action from '../models/Action'
import Header from './Header'

type Props = {}

const SudokuBoard = (props: Props) => {
    // let emptyBoard = Array.from({length: 9}, e => Array(9).fill(''));
    let emptyBoard = [...Array(9)].map(e => Array(9).fill(''))
    let [board, setBoard] = useState(emptyBoard)
    let [status, setStatus] = useState(checkSudoku(board))
    let [actionStack, setActionstack] = useState([])

    let checkBoard = () => {
        setStatus(checkSudoku(board))
    }

    useEffect(() => {
        checkBoard()
    }, [board])

    useEffect(() => {
        console.log(actionStack)
    }, [actionStack])

    let solveBoard = () => {
        if (!isValidSudoku) {
            return
        }
        let tempStack: any = [...actionStack]
        tempStack.push({
            x: -1,
            y: -1,
            value: ''
        })
        let tempBoard = [...board]
        solveSudoku(tempBoard, 0, 0)
        setBoard(tempBoard)
        setActionstack(tempStack)
    }

    let resetBoard = () => {
        setBoard(emptyBoard)
        setActionstack([])
    }

    let undoAction = () => {
        if (actionStack.length == 0) {
            return
        }
        let tempBoard = [...board]
        let tempStack = [...actionStack]
        let { x, y, value }: any = tempStack.pop()
        setActionstack(tempStack)
        if ( x == -1 && y == -1) {
            setBoard(emptyBoard)
            return
        }
        tempBoard[x][y] = value
        setBoard(tempBoard)

    }

    return (
        <div className='app-container'>
            <div className='left-panel'></div>
            <div className='sudoku-container'>
                <Header />
                <div className='sudoku-board'>
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
                                                        setActionstack={setActionstack}
                                                        actionStack={actionStack}
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
                    <button onClick={resetBoard}>
                        Reset sudoku
                    </button>
                    <button onClick={undoAction}>
                        Undo Action
                    </button>
                </div>
            </div>
            <div className='right-panel'>
                <div className='status'>
                    {status}
                </div>
            </div>
        </div>
    )
}

export default SudokuBoard