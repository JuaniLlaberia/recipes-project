import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faX, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as fullHear} from "@fortawesome/free-regular-svg-icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavContext } from "../context/favoriteContext";
import FavoriteItems from "./FavoriteItems";
import ErrorCard from "./ErrorCard";

const Home = ({setQuery}) => {
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const {favoriteRecipes} = useFavContext();
  const navigate = useNavigate();
  const searchQuery = useRef();

  //Set the loaded to true to trigger the animations
  useEffect(() => setLoaded(true));

  //Redirects to the recipes and set the query (stored as a global state)
  const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.current.value === '') {
          setErrorPopUp(true);
          return;
        };
        setQuery(searchQuery.current.value);
        localStorage.setItem('RECIPE_QUERY', JSON.stringify(searchQuery.current.value));
        navigate('/recipes');
  };

  //Hides the error msg after 4s
  useEffect(() => {
    setTimeout(() => {
      setErrorPopUp(false);
    }, 4000)
  }, [errorPopUp]);

  //Close favorite modal
  const handleClose = () => setShowModal(false);

  //Will return the array with the elements to display
  const favToDisplay = favoriteRecipes.map(recipe => {
    return <FavoriteItems key={recipe.recipeID} name={recipe.name} srcImg={recipe.srcImg} id={recipe.recipeID}/>
  });

  return (
    <main className='home-page'>
          <h1 className={loaded ? 'home-title' : 'home-title-unloaded'}>All the recipes you need!</h1>
          <p className={loaded ? 'home-sec-title' : 'home-sec-title-unloaded'}>Search for over 1.000.000 recipes</p>
          <form className={loaded ? 'search-form' : 'search-form-unloaded'} onSubmit={handleSubmit}>
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
