import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fullHear} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavContext } from "../context/favoriteContext";
import FavoriteItems from "./FavoriteItems";
import ErrorCard from "./ErrorCard";

const Home = ({setQuery}) => {
  const [showModal, setShowModal] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const searchQuery = useRef();
  const navigate = useNavigate();
  const {favoriteRecipes} = useFavContext();

  const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.current.value === '') {
          setErrorPopUp(true);
          return;
        };
        setQuery(searchQuery.current.value);
        localStorage.setItem('RECIPE_QUERY', JSON.stringify(searchQuery.current.value));
        navigate('/recipes');
  }

  useEffect(() => {
    setTimeout(() => {
      setErrorPopUp(false);
    }, 4000)
  }, [errorPopUp]);

  const handleClose = () => setShowModal(false);

  const favToDisplay = favoriteRecipes.map(recipe => {
    console.log(recipe);
    return <FavoriteItems key={recipe.recipeID} name={recipe.name} srcImg={recipe.srcImg} id={recipe.recipeID}/>
  })

  return (
    <main className='home-page'>
        <h1 className='home-title'>All the recipes you need!</h1>
        <p className='home-sec-title'>Search for over 1.000.000 recipes</p>
        <form className="search-form" onSubmit={handleSubmit}>
          <div className='search-bar'>
            <input ref={searchQuery} type="text" placeholder='Recipe category e.g. pizza, pasta'/>
            <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
          </div>
          <button className='search-btn'>Search</button>
        </form>
        <FontAwesomeIcon onClick={() => setShowModal(true)} icon={showModal ? faHeart : fullHear} className={!showModal ? 'heart-icon-home' : 'heart-icon-home-active'} size="2x"/>
        {showModal ? <div className='fav-modal'>
          <div className='x-icon' onClick={handleClose}>
            <FontAwesomeIcon icon={faX}/>
          </div>
          <h6 className='fav-title'>Favorite Recipes</h6>
          <ul className='fav-container'>
            {favoriteRecipes.length > 0 ? favToDisplay : <p className='no-fav'>No recipes found. Add as many as you want.</p>}
          </ul>
        </div> : null}
        {showModal ? <div onClick={handleClose} className='overlay'></div> : null}
        {errorPopUp ? <ErrorCard /> : null}
    </main>
  )
}

export default Home
