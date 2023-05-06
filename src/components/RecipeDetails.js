import { faArrowLeft, faCheck, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser } from '@fortawesome/free-regular-svg-icons';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import fracty from "fracty";

const RecipeDetails = () => {
    const [recipeInfo, setRecipeInfo] = useState({});
    const [servings, setServings] = useState(4);
    let { recipeId } = useParams();

    useEffect(() => {
        const fetchRecipeInfo = async () => {
            try {
                const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`);
                const data = await response.json();
                setRecipeInfo(data.data.recipe);
            } catch(err) {
                console.log(err);
            }
        }
        fetchRecipeInfo();
    }, [recipeId])

    const ingredientsList = recipeInfo.ingredients?.map((ing, i) => {
        let quantityIng = (ing.quantity / 4) * servings;
        return <li key={i} className='ingredients-item'><FontAwesomeIcon className='icon-ing' icon={faCheck}/>{ing.quantity ? fracty(quantityIng).toString() : ''} {ing.unit} {ing.description[0][0].toUpperCase() + ing.description.slice(1)}</li>
    });

    const handleClickPlus = () => {
      if (servings === 16) return servings;
      setServings(servings + 1)};

    const handleClickMinus = () => {
      if (servings === 1) return servings;
      setServings(servings - 1);};

  return (
    <main className='recipe-details-page'>
      <section className='top-section'>
        <div className='img-container'>
          <img src={recipeInfo.image_url} alt={recipeInfo.title}/>
        </div>
        <div className='info-recipe-details'>
          <h6>{recipeInfo.title}</h6>
          <p>By <a href={recipeInfo.source_url}>{recipeInfo.publisher}</a></p>
          <div className='info-info'><FontAwesomeIcon icon={faClock} style={{color:'rgb(255, 157, 52)'}}/>{recipeInfo.cooking_time} min. <span>|</span> {recipeInfo.ingredients?.length} Ingridients </div>
          <div className='change-portions'>
              <p><FontAwesomeIcon icon={faUser} style={{color:'rgb(255, 157, 52)'}}/> Servings {servings}</p>
              <div className='btns-portions'>
                <button onClick={handleClickMinus}><FontAwesomeIcon icon={faMinus}/></button>
                <button onClick={handleClickPlus}><FontAwesomeIcon icon={faPlus}/></button>
              </div>
          </div>
        </div>
      </section>
      <section className='ingredients-section'>
        <h6>Ingredients</h6>
        <ul className='ingridients-container'>
          {ingredientsList}
        </ul>
      </section>
      <Link to='/recipes' className='back-home'><FontAwesomeIcon icon={faArrowLeft}/>Back Home</Link>
    </main>
  )
}

export default RecipeDetails
