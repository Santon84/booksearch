import './App.css'
import {Routes, Route} from 'react-router-dom'
import BookPage from './pages/BookPage'
import Home from './pages/Home'


function App() {
 
  return (
      <Routes>
        <Route path='*' element={<Home/>}/>
        <Route path='/book/:bookId' element={<BookPage/>}/>
      </Routes>
    )
}

export default App
