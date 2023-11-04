import React, { useEffect, useState } from 'react'
import './SudokuBoard.scss'
import SudokuCell from './SudokuCell'
import { isValidSudoku, solveSudoku, checkSudoku } from '../utils/SudokuUtils'
import Action from '../models/Action'
import Header from './Header'

type Props = {}

const SudokuBoard = (props: Props) => {
    let emptyBoard = [...Array(9)].map(e => Array(9).fill(''))
    let [board, setBoard] = useState(emptyBoard)
    let [status, setStatus] = useState(checkSudoku(board))
    let [actionStack, setActionstack] = useState<Array<Action>>([])

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
        if (!isValidSudoku(board)) {
            return
        }
        let tempStack: Array<Action> = [...actionStack]
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
            {/* <div className='left-panel'></div> */}
            <div className='sudoku-container'>
                <Header />
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
                                                        setBoard={setBoard}
                                                        board={board}
                                                        setActionstack={setActionstack}
                                                        actionStack={actionStack}
                                                    />
                                                )
                                            })
                                        }
                                    </>
                            )
                        })
                    }
                </div>
                {/* <div className='status'>
                    {status}
                </div> */}
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
        </div>
    )
}

export default SudokuBoard