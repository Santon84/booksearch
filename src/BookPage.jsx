import React, { useEffect, useState } from 'react'
import {  useSelector , useDispatch } from 'react-redux'
import { getBookById } from './redux/requests/fetch';
import { API_URL_DEFAULT_BOOKS } from './api/api';
import { useParams, useNavigate   } from 'react-router-dom';
import './BookPage.css'

function BookPage() {
  const dispatch = useDispatch();
  const book = useSelector(state => state.bookPage);
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [authors, setAuthors] = useState('');
  const [img, setImg] = useState('');
  const navigate = useNavigate();
  let { bookId } = useParams();
  useEffect(()  => {
    if (!bookId) return;
    dispatch(getBookById(API_URL_DEFAULT_BOOKS+'/'+bookId));
    
  }, [dispatch,bookId])

  useEffect(() => {
    console.log('book changed')
    setTitle(book?.item?.volumeInfo?.title);
    setCat(book?.item?.volumeInfo?.categories?.join('/'));
    setAuthors(book?.item?.volumeInfo?.authors?.join(','));
    setImg(book?.item?.volumeInfo?.imageLinks?.medium);
    
  },[book])
  

  function handleBack() {
    setTitle('');
    setImg('');
    navigate(-1);
  }
  console.log('book', book)
  return (
    <div>
        <button onClick={()=>handleBack()}> Back </button>
      {book.error ? book.error: null }
      {!book.loading &&
      <>

        <div className="book-page">
      <div className="book-page__img">
        
        <img src={img} alt='book cover' />
      </div>
      <div className="book-page__categorie">
      {cat}
      </div>
      <div className="book-page__title">
      {title}
      </div>
      <div className="book-page__authors">
      {authors}
      </div>
     
    </div>
      </>}
      
      {/* {bookInfo.item} */}
    </div>
  )
}

export default BookPage
