import './SudokuCell.scss'
import Action from '../models/Action'
import { cellBorderClassNameMapping } from '../utils/CellBorderUtils'

type Props = {
    value: string,
    rowIndex: number,
    colIndex: number,
    setBoard: Function,
    board: Array<Array<string | number>>,
    setActionstack: Function,
    actionStack: Array<Action>,
    selectedNumber: string,
    setSelectedNumber: Function,
    selectedCellCol: number,
    setSelectedCellCol: Function,
    selectedCellRow: number,
    setSelectedCellRow: Function,
}

const SudokuCell = (props: Props) => {
    let { value, rowIndex, colIndex, setBoard, board, setActionstack, actionStack, selectedNumber, setSelectedNumber,
        selectedCellCol, setSelectedCellCol, selectedCellRow, setSelectedCellRow } = props

    let isNumberSelected: boolean = selectedNumber != '' && selectedNumber == value

    let isCellSelected: boolean = rowIndex == selectedCellRow && colIndex == selectedCellCol

    let cellBorderClass = (): string => {
        let s = ''
        s += cellBorderClassNameMapping.row[rowIndex] + ' '
        s += cellBorderClassNameMapping.col[colIndex] + ' '
        return s
    }

    let onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const re: RegExp = /^[1-9\b]+$/
        let newValue = e.target.value
        if (re.test(newValue) || newValue === '') {
            let tempBoard: Array<Array<string | number>> = [...board]
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
        setSelectedCellCol(colIndex)
        setSelectedCellRow(rowIndex)
    }


    return (
        <input
            maxLength={1}
            onChange={onChange}
            value={value}
            className={`cell ${(isNumberSelected && 'number-selected')} ${isCellSelected && 'cell-selected'} ${cellBorderClass()}`}
            onClick={onClick}
            inputMode='none'
        />
    )
}

export default SudokuCell