import React from 'react'
import { Link } from 'react-router-dom'

const RecipeItem = ({imgSrc, title, id}) => {
  return (
    <li className='recipe-item'>
        <div className='recipe-info'>
            <img src={imgSrc} className='recipe-img' alt={title}/>
            <h6 className='recipe-title'>{title}</h6>
        </div>
        <div className='recipe-btns'>
            <Link to={`/recipes/${id}`} className='recipe-link'>More Info</Link>
            {/* <button className='recipe-save'>Save</button> */}
        </div>
    </li>
  )
}

export default RecipeItem
