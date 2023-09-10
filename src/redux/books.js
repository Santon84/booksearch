
import { createSlice, createAction } from '@reduxjs/toolkit'
import { fetchBooks } from './requests/fetch'


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
    builder.addCase(fetchBooks.pending, (state) => {
      
      state.loading = true;
      
      }) 

     builder.addCase(fetchBooks.fulfilled, (state, action) => {
      
      state.loading = false;
      if (action.payload === undefined) return state;
      
      state.items = state.append ? [...state.items, ...action.payload.items] : action.payload.items;
      state.error = '';
    
      state.totalItems = action.payload.totalItems || 0;
      
     })

     builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      
     })
     
     builder.addCase(addPage, (state) => {
      
      state.startIndex = state.startIndex + state.itemsPerPage;
      state.append = true;
      
      }) 
      builder.addCase(newSearch, () => {
        
        return initialState;
        
      }) 
    },
  })




  export default booksSlice.reducer
  