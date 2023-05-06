import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RecipeItem from './RecipeItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Recipes = ({query}) => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    let searchQuery = query;

    useEffect(() => {
      if(searchQuery === '') {
          const storedQuery = JSON.parse(localStorage.getItem('RECIPE_QUERY'))
          searchQuery = storedQuery;
      }
    }, []);

    useEffect(() => {
      setIsLoading(true);
        const fetchRecipes = async () => {
            try {
                const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchQuery}`);
                const data = await response.json();
                setIsLoading(false);
                setRecipes(data.data.recipes);
            } catch(err) {
                console.log(err);
            }
        }
        fetchRecipes();
    }, [query]);

    const recipesToDisplay = recipes.map(recipe => {
      return <RecipeItem key={recipe.id} title={recipe.title} imgSrc={recipe.image_url} id={recipe.id}/>
    })

  return (
    <main className='recipes-page'>
        <h6 className='recipes-results'><span className='results-num'>{recipes.length}</span> results for {query[0]?.toUpperCase() + query.slice(1)}</h6>
        {isLoading  ?  <div className='loader'></div>:
        <ul className='recipes-container'>
          {recipes.length === 0 ? <div>No Results Found</div> : recipesToDisplay}
        </ul>}
        <Link to='/' className='back-home'><FontAwesomeIcon icon={faArrowLeft}/>Back Home</Link>
    </main>
  )
}

export default Recipes
