import './SudokuCell.scss'
import Action from '../models/Action'
import { useEffect } from 'react'
import { cellBorderClassNameMapping } from '../utils/CellBorderUtils'

type Props = {
    value: string,
    rowIndex: number,
    colIndex: number,
    setBoard: Function,
    board: Array<Array<string>>,
    setActionstack: Function,
    actionStack: Array<Action>,
    selectedNumber: string,
    setSelectedNumber: Function
}




const SudokuCell = (props: Props) => {
    let { value, rowIndex, colIndex, setBoard, board, setActionstack, actionStack, selectedNumber, setSelectedNumber } = props

    let isSelected = selectedNumber != '' && selectedNumber == value

    let cellBorderClass = (): string => {
        let s = ''
        s += cellBorderClassNameMapping.row[rowIndex] + ' '
        s += cellBorderClassNameMapping.col[colIndex] + ' '
        return s
    }

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.key === 'Escape') {
                setSelectedNumber('')
                event.target.blur();
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    let onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re: RegExp = /^[1-9\b]+$/
        let newValue = e.target.value
        if (re.test(newValue) || newValue === '') {
            let tempBoard: Array<Array<string>> = [...board]
            let tempStack = [...actionStack]
            tempStack.push({
                x: rowIndex,
                y: colIndex,
                value: board[rowIndex][colIndex]
            })
            setActionstack(tempStack)
            tempBoard[rowIndex][colIndex] = newValue
            setBoard(tempBoard)
            setSelectedNumber(newValue)
        }
    }

    let onClick = () => {
        setSelectedNumber(value)
    }


    return (
        <input
            maxLength={1}
            onChange={onChange}
            value={value}
            className={`cell ${(isSelected && 'cell-selected')} ${cellBorderClass()}`}
            onClick={onClick}
        />
    )
}

export default SudokuCell