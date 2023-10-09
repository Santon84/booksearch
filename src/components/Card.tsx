import './Card.css'
import { Link } from 'react-router-dom';



function Card({book}:any) {

  
  const title = book.volumeInfo.title || '';
  const categorie = (book?.volumeInfo?.categories || [])[0];
  const authors = book?.volumeInfo?.authors?.join(',') || '';
  const imgUrl = book?.volumeInfo?.imageLinks?.thumbnail || '';

  return (
    
    <div className="book-card">
      <Link to={'/book/'+book?.id} >
        <div className="book-card__img">
          <img src={imgUrl} alt='book cover' />
        </div>
      </Link>
      <div className="book-card__categorie">
      {categorie || <p></p>}
      </div>
      <Link to={'/book/'+book?.id} >
        <div className="book-card__title">
        {title || <p></p>}
        </div>
      </Link>
      <div className="book-card__authors">
      {authors || <p></p>}
      </div>
     
    </div>
  )
}

export default Card
