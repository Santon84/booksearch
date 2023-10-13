import React, { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPage } from '../redux/books';
import { API_URL_DEFAULT_BOOKS } from '../constants/constants';
import './SearchBar.css';
import { genres } from '../constants/constants';
import { getBooks } from '../redux/api/booksAPI';


function SearchBar({children }) {
    const books = useSelector(state => state.books);
    const dispatch = useDispatch();

    const [searchKey, setSearchKey] = React.useState('');
    const [searchUrl, setSearchUrl] = React.useState('');
    const startIndex = books.startIndex;
    const categorieRef = useRef();
    const sortRef = useRef();


    
    
    
  
    function searchBooks ()  {
      if (!searchKey) return;
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
      if (!searchUrl) return;
      dispatch(getBooks(searchUrl));
    }, [searchUrl, dispatch])

    
    useEffect(() => {
     if (!searchKey) return;
      urlBuilderHandler();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[startIndex])     


    
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
            {genres.map(item => <option key={item} value={item}>{item}</option>)  }     
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
        {books?.items?.length>0 && <input type="button" onClick={(e) => handleMore(e)} value="Еще" />}
      </div>
    </div>
  )
}

export default SearchBar
