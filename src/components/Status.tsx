import { useSelector } from 'react-redux'
import { RootState } from '../app/Store'
import { getNumberOfFilledCells } from '../utils/SudokuUtils'

const Status = () => {
    let board: Array<Array<string>> = useSelector((state: RootState) => state.sudoku.board)

  return (
    <div>
        Status: {getNumberOfFilledCells(board)} / {81}
    </div>
  )
}

export default Status