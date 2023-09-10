import './Card.css'
import { Link } from 'react-router-dom';
function Card({book}) {

  
  const title = book.volumeInfo.title || '';
  const categorie = (book?.volumeInfo?.categories || [])[0];
  const authors = book?.volumeInfo?.authors?.join(',') || '';
  const imgUrl = book?.volumeInfo?.imageLinks?.thumbnail || '';

  return (
    <Link to={'/book/'+book?.id} >
    <div className="book-card">
      <div className="book-card__img">
        
        <img src={imgUrl} alt='book cover' />
      </div>
      <div className="book-card__categorie">
      {categorie}
      </div>
      <div className="book-card__title">
      {title}
      </div>
      <div className="book-card__authors">
      {authors}
      </div>
     
    </div></Link>
  )
}

export default Card
