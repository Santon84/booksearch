
import { createSlice } from '@reduxjs/toolkit'
import { getBookById } from './requests/booksAPI'


const initialState = {
    item: {},
    loading: true,
    error: '',
}


const bookPageSlice = createSlice({
    name: 'bookPage',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBookById.pending, (state) => {
          state.loading = true;
          
          }) 

        builder.addCase(getBookById.fulfilled, (state, action) => {
          
          state.loading = false;
          if (action.payload === undefined) return state;
          console.log('page action', action.payload);
          state.item = action.payload.data  ;
          state.error = '';
          
        })

        builder.addCase(getBookById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          
        })
     }
  })




  export default bookPageSlice.reducer
  