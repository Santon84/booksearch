
import { createSlice } from '@reduxjs/toolkit'
import { getBookById } from './requests/fetch'


const initialState = {
    item: {title: 'hello world'},
    loading: false,
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
          
          state.item = action.payload;
          state.error = '';
          
        })

        builder.addCase(getBookById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
          
        })
     }
  })




  export default bookPageSlice.reducer
  