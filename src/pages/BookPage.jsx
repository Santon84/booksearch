import { useEffect } from 'react'
import {  useSelector , useDispatch } from 'react-redux'
import { getBookById } from '../redux/api/booksAPI';

import { API_URL_DEFAULT_BOOKS } from '../constants/constants';
import { useParams, useNavigate   } from 'react-router-dom';
import './BookPage.css'

function BookPage() {
  const dispatch = useDispatch();
  const book = useSelector(state => state.bookPage);
  const navigate = useNavigate();
  let { bookId } = useParams();

  const { item = {}, loading = true, error = '' } = book;
  
  useEffect(()  => {
    if (!bookId) return;
    dispatch(getBookById(API_URL_DEFAULT_BOOKS+'/'+bookId));
  }, [dispatch,bookId])


  function handleBack() {
    navigate(-1);
  }

  if (loading) {
    return 'Loading...'
  }

  const { title = '', categories = [], authors = [], description = '', imageLinks} = item?.volumeInfo;
  
  return (
    <div>
      <button onClick={()=>handleBack()}> Back </button>
      {error ? error : null }
      {
      !loading &&
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
          <div dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
      </div>
    </div>
      }
    </div>
  )
}

export default BookPage
