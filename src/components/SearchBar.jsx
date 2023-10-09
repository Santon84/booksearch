import React, { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBooks } from '../redux/requests/fetch';
import { addPage, newSearch } from '../redux/books';
import { API_URL_DEFAULT_BOOKS } from '../api/api';
import './SearchBar.css';

function SearchBar({children }) {
    const books = useSelector(state => state.booksReducer);
    const dispatch = useDispatch();

    const [searchKey, setSearchKey] = React.useState('');
    const [searchUrl, setSearchUrl] = React.useState('');
    const startIndex = books.startIndex;
    const categorieRef = useRef();
    const sortRef = useRef();


    
    
    
  
    function searchBooks ()  {
            dispatch(newSearch());
            urlBuilderHandler();            
    }


    function urlBuilderHandler() {
      if (!searchKey) return;
      setSearchUrl(`${API_URL_DEFAULT_BOOKS}?q=${searchKey}${categorieRef.current.value !== 'all' ? '+subject:'+categorieRef.current.value : ''}&maxResults=${books?.itemsPerPage || 30}&startIndex=${startIndex}&orderBy=${sortRef.current.value}`)
    }


    function handleKeyDown(e) {
      if (e.keyCode === 13) {
        searchBooks();
      }
    }

    function handleMore(e) {
      dispatch(addPage());
      urlBuilderHandler();
    }

    useEffect(() => {
      dispatch(fetchBooks(searchUrl));
    }, [searchUrl, dispatch])
    
    useEffect(() => {
      if (!searchKey) return;
      urlBuilderHandler();
    },[startIndex])

    
    console.log('render searchbar');
    return (
    
    <div className='search-bar'>

      <div className='search-bar__top'>
        <div className='search-bar__title'>Books search</div>
        <div className = 'search-bar__controls'>
          <input placeholder="Поиск" type="search" className='search-bar__input' value={searchKey} onKeyDown = {(e) => handleKeyDown(e)} onChange={(e) => setSearchKey(e.target.value)}  />
          <input type="button" className='search-btn' onClick={(e) => searchBooks(e)} value="Искать" />
        </div>
        <div className='search-bar__filters'>
          <label htmlFor="genres"> Категории </label>
          <select id='genres' ref={categorieRef} onChange={() => searchBooks()}>
            <option value="all">all</option>
            <option value="art">art</option>
            <option value="biography">biography</option>
            <option value="computers">computers</option>
            <option value="history">history</option>
            <option value="medical">medical</option>
            <option value="poetry">poetry</option>
          </select>
          <label htmlFor="sortBy"> Сортировка </label>
          <select id='sortBy' name='sort' ref={sortRef} onChange={() => searchBooks()}>
            <option value="relevance">relevance</option>
            <option value="newest">newest</option>
          </select>
        </div>
      </div>
      {children}
      <div className='search-bar__bottom'>
        {books.items.length>0 && <input type="button" onClick={(e) => handleMore(e)} value="Еще" />}
      </div>
    </div>
  )
}

export default SearchBar
