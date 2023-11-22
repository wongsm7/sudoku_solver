import DifficultySelector from '../components/DifficultySelector'
import Header from '../components/Header'
import NumberButtons from '../components/NumberButtons'
import SudokuBoard from '../components/SudokuBoard'
import UtilButtons from '../components/UtilButtons'
import './App.scss'

function App() {
  return (
    <div className='app-container'>
      <Header />
      <DifficultySelector />
      <SudokuBoard />
      <NumberButtons />
      <UtilButtons />
    </div>
  )
}

export default App
