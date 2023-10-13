
import { createSlice, createAction } from '@reduxjs/toolkit'
import { getBooks } from './api/booksAPI'


const initialState = {
    items: [],
    loading: false,
    error: '',
    itemsPerPage: 30,
    startIndex: 0,
    append: false,
    totalItems: 0
}

export const addPage = createAction('addpage')
export const newSearch = createAction('newsearch');

const booksSlice = createSlice({
    name: 'books',
    initialState,
    extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state) => {
      
      state.loading = true;
      
      }) 

    builder.addCase(getBooks.fulfilled, (state, action) => {
      
      state.loading = false;
      if (action.payload === undefined) return state;

      if (state.append) {
        state.items = [...state.items, ...action.payload.data.items];
        state.append = false;
      } else {
        state.items = action.payload.data.items;
      }
      state.error = '';
      state.totalItems = action.payload.data.totalItems || 0;
      
     })

     builder.addCase(getBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.data.error;
      
     })
     
     builder.addCase(addPage, (state) => {
      
      state.startIndex = state.startIndex + state.itemsPerPage + 1;
      state.append = true;
      
      }) 
      builder.addCase(newSearch, () => {
        
        return initialState;
        
      }) 
    },
  })




  export default booksSlice.reducer
  