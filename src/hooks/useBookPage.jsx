import React, { useEffect, useState } from 'react'
import {  useSelector , useDispatch } from 'react-redux'
import { getBookById } from '../redux/requests/fetch';
import { API_URL_DEFAULT_BOOKS } from '../redux/api/api';

export function useBookPage(bookId) {
    const [book, setBook] = useState(undefined);
    const dispatch = useDispatch();
    const book1 = useSelector(state => state.bookPage);

    console.log('hook 1', bookId);
    useEffect(()  => {
        if (!bookId) return;
        dispatch(getBookById(API_URL_DEFAULT_BOOKS+'/'+bookId));
        setBook(book1);
        console.log('book1', book1);
      }, [dispatch,bookId])

      console.log('hook', book)
  return book
}

