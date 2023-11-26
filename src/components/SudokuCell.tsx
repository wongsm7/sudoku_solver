import './SudokuCell.scss'
import { cellBorderClassNameMapping } from '../utils/CellBorderUtils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/Store'
import { setSelectedCellCol, setSelectedCellRow, setSelectedNumber } from '../features/SudokuSlice'

type Props = {
    value: string,
    rowIndex: number,
    colIndex: number,
    isFixed: boolean,
    isError: boolean
}

const SudokuCell = (props: Props) => {
    let { value, rowIndex, colIndex, isFixed, isError } = props
    let dispatch = useDispatch()
    let selectedNumber = useSelector((state: RootState) => state.sudoku.selectedNumber)
    let selectedCellRow = useSelector((state: RootState) => state.sudoku.selectedCellRow)
    let selectedCellCol = useSelector((state: RootState) => state.sudoku.selectedCellCol)
    let fastPencil = useSelector((state: RootState) => state.sudoku.fastPencil)

    let isNumberSelected: boolean = selectedNumber != '' && selectedNumber == value
    let isCellSelected: boolean = rowIndex == selectedCellRow && colIndex == selectedCellCol

    let cellBorderClass = (): string => {
        let s = ''
        s += cellBorderClassNameMapping.row[rowIndex] + ' '
        s += cellBorderClassNameMapping.col[colIndex] + ' '
        return s
    }

    let onClick = () => {
        dispatch(setSelectedCellCol(colIndex))
        dispatch(setSelectedCellRow(rowIndex))
        if (!fastPencil) {
            dispatch(setSelectedNumber(value))
        }
    }
    

    return (
        <input
            maxLength={1}
            readOnly={true}
            value={value}
            className={`
                cell ${(isNumberSelected && 'number-selected')} ${isCellSelected && 'cell-selected'} 
                ${cellBorderClass()} ${isFixed ? 'fixed' : 'unfixed'} ${isError && 'error'}
            `}
            onClick={() => onClick()}
            inputMode='none'
        />
    )
}

export default SudokuCell