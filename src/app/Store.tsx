import { configureStore } from '@reduxjs/toolkit'
import sudokuReducer from '../features/SudokuSlice'
import moveStackReducer from '../features/MoveStackSlice'

export const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
    moveStack: moveStackReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch