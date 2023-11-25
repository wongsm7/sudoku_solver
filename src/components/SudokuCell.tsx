import './SudokuCell.scss'
import { cellBorderClassNameMapping } from '../utils/CellBorderUtils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/Store'
import { setSelectedCellCol, setSelectedCellRow, setSelectedNumber } from '../features/SudokuSlice'

type Props = {
    value: string,
    rowIndex: number,
    colIndex: number,
    isFixed: boolean
}

const SudokuCell = (props: Props) => {
    let { value, rowIndex, colIndex, isFixed } = props
    let dispatch = useDispatch()
    let selectedNumber = useSelector((state: RootState) => state.sudoku.selectedNumber)
    let selectedCellRow = useSelector((state: RootState) => state.sudoku.selectedCellRow)
    let selectedCellCol = useSelector((state: RootState) => state.sudoku.selectedCellCol)

    let isNumberSelected: boolean = selectedNumber != '' && selectedNumber == value
    let isCellSelected: boolean = rowIndex == selectedCellRow && colIndex == selectedCellCol

    let cellBorderClass = (): string => {
        let s = ''
        s += cellBorderClassNameMapping.row[rowIndex] + ' '
        s += cellBorderClassNameMapping.col[colIndex] + ' '
        return s
    }

    let onClick = () => {
        dispatch(setSelectedNumber(value))
        dispatch(setSelectedCellCol(colIndex))
        dispatch(setSelectedCellRow(rowIndex))
    }
    

    return (
        <input
            maxLength={1}
            readOnly={true}
            value={value}
            className={`cell ${(isNumberSelected && 'number-selected')} ${isCellSelected && 'cell-selected'} ${cellBorderClass()} ${isFixed ? 'fixed' : 'unfixed'}`}
            onClick={() => onClick()}
            inputMode='none'
        />
    )
}

export default SudokuCell