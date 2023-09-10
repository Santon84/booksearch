import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const API_KEY = process.env.REACT_APP_BOOKS_API;


export const fetchBooks = createAsyncThunk('books/fetchBooks', async (url) => {
    if (!url) return
    console.log(url)
    return axios
    .get(`${url}&key=${API_KEY}`)
    .then(response => {
        console.log(response.data.items);
        return response.data
    });
  })

  export const getBookById = createAsyncThunk('bookInfo/getBookById', async (url) => {
    if (!url) return
    return axios
    .get(`${url}`) //&key=${API_KEY}
    .then(response => {
        return response.data
    });
  })