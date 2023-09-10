import SearchBar from './SearchBar'
import './App.css'
import {Routes, Route, Link} from 'react-router-dom'
import CardList from './CardList'
import BookPage from './BookPage'

function App() {
 
 

  return (
  
      <>
      <Routes>
        <Route path='*' element={<div className='container'>
          <SearchBar>
            <CardList/>
          </SearchBar>
        </div>}
        />
        <Route path='/book/:bookId' element={<><BookPage/></>}/>
      </Routes>
      
      
  
    </>
  )
}

export default App
