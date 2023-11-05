import './SudokuCell.scss'
import Action from '../models/Action'
import { useEffect } from 'react'

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
    let { value, rowIndex, colIndex, setBoard, board, setActionstack, actionStack, selectedNumber, setSelectedNumber} = props

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

    let isSelected = selectedNumber != '' && selectedNumber == value

    return (
            <input 
                maxLength={1}
                onChange={onChange}
                value={value}
                className={`cell ${(isSelected && 'cell-selected')}`}
                onClick={onClick}
            />
    )
}

export default SudokuCell