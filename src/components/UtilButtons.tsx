import { isValidSudoku } from '../utils/SudokuUtils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/Store'
import { clearBoard, generateBoard, setCell, solveBoard } from '../features/SudokuSlice'
import './UtilButtons.scss'
import { clearMoves, popMove, pushMove } from '../features/MoveStackSlice'

const UtilButtons = () => {
  let dispatch = useDispatch()
  let actionStack = useSelector((state: RootState) => state.moveStack.stack)
  let board: Array<Array<string>> = useSelector((state: RootState) => state.sudoku.board)


  let solve = () => {
    if (!isValidSudoku(board)) {
        return
    }
    dispatch(pushMove({
        x: -1,
        y: -1,
        value: ''
    }))
    dispatch(solveBoard(board))
}

let reset= () => {
    dispatch(clearBoard())
    dispatch(clearMoves())
}

let undo = () => {
    if (actionStack.length == 0) {
        return
    }

    let { x, y, value }: any = actionStack[actionStack.length - 1]
    dispatch(popMove())
    if (x == -1 && y == -1) {
        dispatch(clearBoard())
        return
    }
    dispatch(setCell({
        x, y, value
    }))
}

let generate = () => {
    dispatch(generateBoard())
}

  return (
    <div className='util-buttons'>
      <button className='solve-button' onClick={solve}>
        Solve sudoku
      </button>
      <button className='reset-button' onClick={reset}>
        Reset sudoku
      </button>
      <button className='undo-button' onClick={undo}>
        Undo Move
      </button>
      <button className='generate-button' onClick={generate}>
        Generate sudoku
      </button>
    </div>
  )
}

export default UtilButtons