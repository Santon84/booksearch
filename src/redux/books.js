
import { createSlice, createAction } from '@reduxjs/toolkit'
import { getBooks } from './requests/booksAPI'



// type BooksItems = {


// }

const initialState = {
    items: [],
    loading: true,
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
      
      state.items = state.append ? [...state.items, ...action.payload.items] : action.payload.items;
      state.error = '';
    
      state.totalItems = action.payload.totalItems || 0;
      
     })

     builder.addCase(getBooks.rejected, (state, action) => {
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
  