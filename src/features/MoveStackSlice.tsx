import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type Move from '../models/Move'

export interface MoveStackState {
  stack: Array<Move>,
}

const initialState: MoveStackState = {
  stack: [],
}

export const moveStackSlice = createSlice({
  name: 'sudoku',
  initialState,
  reducers: {
    pushMove: (state, action: PayloadAction<Move>) => {
      state.stack.push(action.payload)
    },
    popMove: (state) => {
      state.stack.pop()
    },
    clearMoves: (state) => {
      state.stack = []
    }
  },
})


// Action creators are generated for each case reducer function
export const { pushMove, popMove, clearMoves } = moveStackSlice.actions

export default moveStackSlice.reducer