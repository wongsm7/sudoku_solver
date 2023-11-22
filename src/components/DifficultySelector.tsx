import React from 'react'
import { DIFFICULTY } from '../constants/Difficulty'
import { setDifficulty } from '../features/SudokuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/Store'

const DifficultySelector = () => {
    let dispatch = useDispatch()
    let difficulty = useSelector((state: RootState) => state.sudoku.difficulty)
    let handleDifficultyChange = (e: any) => {
        dispatch(setDifficulty(e.target.value))
    }

    return (
        <div>
            <label>Difficulty: </label>
            <select
                value={difficulty}
                onChange={handleDifficultyChange}
            >
                <option value={DIFFICULTY.EASY}>Easy</option>
                <option value={DIFFICULTY.MEDIUM}>Medium</option>
                <option value={DIFFICULTY.HARD}>Hard</option>
                <option value={DIFFICULTY.EXTREME}>Extreme</option>
            </select>
        </div>
    )
}

export default DifficultySelector