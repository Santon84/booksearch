import { configureStore, combineReducers } from "@reduxjs/toolkit";


import booksSlice from './books'
import bookPageSlice from './bookInfo';

const rootReducer = combineReducers({
    books: booksSlice,
    bookPage: bookPageSlice, 
}
)
export const store = configureStore({
    reducer: rootReducer,
})



export default store
