import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type Move from '../models/Move'
import { emptyBoard } from '../data/EmptyBoard'
import { generateSudoku, solveSudoku } from '../utils/SudokuUtils'
import { DIFFICULTY } from '../constants/Difficulty'

export interface SudokuState {
  board: Array<Array<string>>,
  selectedCellRow: number,
  selectedCellCol: number,
  selectedNumber: string,
  difficulty: number,
  fastPencil: boolean
}

const initialState: SudokuState = {
  board: emptyBoard,
  selectedCellRow: -1,
  selectedCellCol: -1,
  selectedNumber: '',
  difficulty: DIFFICULTY.EASY,
  fastPencil: false
}

export const sudokuSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<Array<Array<string>>>) => {
      state.board = action.payload
    },
    generateBoard: (state) => {
      state.board = generateSudoku(state.difficulty)
    },
    solveBoard: (state, action: PayloadAction<Array<Array<string>>>) => {
      let tempBoard = JSON.parse(JSON.stringify(action.payload))
      solveSudoku(tempBoard, 0, 0)
      state.board = tempBoard
    },
    setCell: (state, { payload }: PayloadAction<Move>) => {
      state.board[payload.x][payload.y] = payload.value
    },
    setSelectedCellRow: (state, action: PayloadAction<number>) => {
      state.selectedCellRow = action.payload
    },
    setSelectedCellCol: (state, action: PayloadAction<number>) => {
      state.selectedCellCol = action.payload
    },
    setSelectedNumber: (state, action: PayloadAction<string>) => {
      state.selectedNumber = action.payload
    },
    setDifficulty: (state, action: PayloadAction<number>) => {
      state.difficulty = action.payload
    },
    setFastPencil: (state, action: PayloadAction<boolean>) => {
      state.fastPencil = action.payload
    }
  },
})

export const { setBoard, solveBoard, setCell, setSelectedCellRow, setSelectedCellCol, setSelectedNumber, setDifficulty, generateBoard, setFastPencil } = sudokuSlice.actions

export default sudokuSlice.reducer