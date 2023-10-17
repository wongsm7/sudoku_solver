import { useEffect, useState } from 'react'
import './SudokuCell.css'
import SudokuBoard from './SudokuBoard'

type Props = {
    value: string,
    rowIndex: number,
    colIndex: number,
    setBoard: Function,
    board: Array<Array<string>>
}

const SudokuCell = (props: Props) => {
    let { value, rowIndex, colIndex, setBoard, board} = props
    let onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re: RegExp = /^[1-9\b]+$/
        if (re.test(e.target.value) || e.target.value === '') {
            let tempBoard: Array<Array<string>> = [...board]
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