import { faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useFavContext } from '../context/favoriteContext'

const FavoriteItems = ({srcImg, name, id}) => {
  const {removeFav} = useFavContext();

  return (
    <li className='recipe-item-fav'>
      <Link to={`/recipes/${id}`}>
        <div className='recipe-info'>
            <img src={srcImg} className='recipe-img' alt={name}/>
            <h6 className='recipe-title-fav'>{name}</h6>
        </div>
      </Link>
      <button className='un-fav-item' onClick={() => removeFav(id)}><FontAwesomeIcon icon={faHeartBroken} size='2x'/></button>
    </li>
  )
}

export default FavoriteItems
