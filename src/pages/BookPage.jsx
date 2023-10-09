import React, { useEffect, useState, Fragment } from 'react'
import {  useSelector , useDispatch } from 'react-redux'
import { getBookById } from '../redux/requests/fetch';
import { API_URL_DEFAULT_BOOKS } from '../api/api';
import { useParams, useNavigate   } from 'react-router-dom';
import './BookPage.css'

function BookPage() {
  const dispatch = useDispatch();
  const book = useSelector(state => state.bookPage);
  // const [title, setTitle] = useState('');
  // const [cat, setCat] = useState('');
  // const [authors, setAuthors] = useState('');
  // const [img, setImg] = useState('');
  // const [descr, setDescr] = useState('');
  const navigate = useNavigate();
  let { bookId } = useParams();
  const { item = {}, loading = true, error = '' } = book;
  
  
  useEffect(()  => {
    if (!bookId) return;
    dispatch(getBookById(API_URL_DEFAULT_BOOKS+'/'+bookId));
  }, [dispatch,bookId])



  // useEffect(() => {
  //   if (!book?.item?.volumeInfo) return;
  //   const currentBook = book.item.volumeInfo;
  //   setTitle(currentBook.title);
  //   setCat(currentBook.categories?.join('/'));
  //   setAuthors(currentBook.authors?.join(','));
  //   setImg(currentBook.imageLinks?.medium);
  //   setDescr(currentBook.description);
  //   return () => {
  //     setTitle('');
  //     setCat('');
  //     setAuthors('');
  //     setImg('');
  //     setDescr('');
  //   }
    
  // },[book])
  

  function handleBack() {
    navigate(-1);
  }
  console.log('render bookpage', book);
  if (loading) {
    return 'Loading...'
  }
  const { title = '', categories = '', authors = [], description = [], imageLinks} = item?.volumeInfo;
  
  return (
    <div>
        <button onClick={()=>handleBack()}> Back </button>
      {error ? error : null }
      {!loading &&
      <>

      <div className="book-page">
      <div className="book-page__img">
        
        <img src={imageLinks?.medium?.replace('http://', 'https://') || imageLinks?.thumbnail?.replace('http://', 'https://')} alt='book cover' />
      </div>
      <div className='book-page__info'>
        <div className="book-page__categorie">
        {categories.join('/')}
        </div>
        <div className="book-page__title">
        {title}
        </div>
        <div className="book-page__authors">
        <p className='book-page__paragraph'>Авторы:</p>
        {authors.join(', ')}
        </div>
        <div className="book-page__description">
        <p className='book-page__paragraph'>Описание:</p>
        
        <div dangerouslySetInnerHTML={{__html: description}} >

        </div>
       
        </div>
      </div>
    </div>
      </>}
      
      {/* {bookInfo.item} */}
    </div>
  )
}

export default BookPage
