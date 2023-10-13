
import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { clearFieldsForBookList } from "../utils/utils";
const API_KEY = process.env.REACT_APP_BOOKS_API;


export const getBooks = createAsyncThunk('books/fetchBooks', async (url:string) => {
    if (!url) return { error: 'no URL provided', data: null };
    
    try {
        const { data } = await axios.get(`${url}&key=${API_KEY}`)
        return { error: null, data: clearFieldsForBookList(data) };
      } catch (error:any) {
        return { error: error, data: null};
      }
    
  })

export const getBookById = createAsyncThunk('bookInfo/getBookById', async (url:string) => {
    if (!url) return { error: 'no URL provided', data: null };
    try {
        const { data } = await axios.get(`${url}`)
        return { error: null, data: data };
      } catch (error:any) {
        return { error: error, data: null};
      }
})