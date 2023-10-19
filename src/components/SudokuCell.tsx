import { useEffect, useState } from 'react'
import './SudokuCell.css'
import SudokuBoard from './SudokuBoard'
import Action from '../models/Action'

type Props = {
    value: string,
    rowIndex: number,
    colIndex: number,
    setBoard: Function,
    board: Array<Array<string>>,
    setActionstack: Function,
    actionStack: Array<Action>
}

const SudokuCell = (props: Props) => {
    let { value, rowIndex, colIndex, setBoard, board, setActionstack, actionStack} = props
    let onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re: RegExp = /^[1-9\b]+$/
        if (re.test(e.target.value) || e.target.value === '') {
            let tempBoard: Array<Array<string>> = [...board]
            let tempStack = [...actionStack]
            tempStack.push({
                x: rowIndex, 
                y: colIndex, 
                value: board[rowIndex][colIndex]
            })
            setActionstack(tempStack)
            tempBoard[rowIndex][colIndex] = e.target.value
            setBoard(tempBoard)
        }
    }

    

    return (
        <>
            <input 
                maxLength={1}
                className='cell'
                onChange={onChange}
                value={value}
            />
        </>
    )
}

export default SudokuCell