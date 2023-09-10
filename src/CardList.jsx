import React from 'react'
import {  useSelector } from 'react-redux'
import Card from './Card';
import './CardList.css'



function CardList() {
  const books = useSelector(state => state.booksReducer);

  console.log(books);
  return (
    <>
    {!books.loading && books.items.length>0 && 'Total books:' + books.totalItems}
    <div className='books-container'>
      
      {books.items.map(book => <Card book={book}></Card>)}
      {books.loading && <div> loading... </div>}
     
    </div>
    </>
  )
}

export default CardList
