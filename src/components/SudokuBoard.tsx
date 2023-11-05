import { useState } from 'react'
import './SudokuBoard.scss'
import SudokuCell from './SudokuCell'
import { generateSudoku, isValidSudoku, solveSudoku } from '../utils/SudokuUtils'
import Action from '../models/Action'
import Header from './Header'
import { DIFFICULTY } from '../constants/Difficulty'

const SudokuBoard = () => {
    let emptyBoard = [...Array(9)].map(() => Array(9).fill(''))
    let [board, setBoard] = useState(emptyBoard)
    let [actionStack, setActionstack] = useState<Array<Action>>([])
    let [difficulty, setDifficulty] = useState(DIFFICULTY.EASY)
    let [selectedNumber, setSelectedNumber] = useState('')

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

    let generateBoard = () => {
        setBoard(generateSudoku(difficulty))
    }

    let handleDifficultyChange = (e: any) => {
        setDifficulty(e.target.value)
    }

    return (
        <div className='app-container'>
            {/* <div className='left-panel'></div> */}
            <div className='sudoku-container'>
                <Header />
                <div>
                    <label>Difficulty: </label>
                    <select 
                        defaultValue={DIFFICULTY.EASY}
                        value={difficulty}
                        onChange={handleDifficultyChange}
                    >
                        <option value={DIFFICULTY.EASY}>Easy</option>
                        <option value={DIFFICULTY.MEDIUM}>Medium</option>
                        <option value={DIFFICULTY.HARD}>Hard</option>
                        <option value={DIFFICULTY.EXTREME}>Extreme</option>
                    </select>
                </div>
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
                                                        selectedNumber={selectedNumber}
                                                        setSelectedNumber={setSelectedNumber}
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
                    <button onClick={generateBoard}>
                        Generate sudoku
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SudokuBoard