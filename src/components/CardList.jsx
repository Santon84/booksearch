import {  useSelector } from 'react-redux'
import Card from './Card';
import './CardList.css'



function CardList() {
  const books = useSelector(state => state.books);

  return (
    <div className='container'>
    {!books.loading && books.items.length>0 && 'Total books:' + books.totalItems}
    <div className='books-container'>
      
      {books.items.map(book => <Card key={book.id+book.etag} book={book}></Card>)}
      {books.loading && <div> loading... </div>}
     
    </div>
    </div>
  )
}

export default CardList
