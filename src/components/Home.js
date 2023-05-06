import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({setQuery}) => {
    const searchQuery = useRef();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.current.value === '') return;
        setQuery(searchQuery.current.value);
        localStorage.setItem('RECIPE_QUERY', JSON.stringify(searchQuery.current.value));
        navigate('/recipes');
    }

    //AXIOS EXAMPLE
    // useEffect(() => {
    //   axios.get("https://jsonplaceholder.typicode.com/posts/1").then(response => {
    //     console.log(response.data);
    //   }).catch(err => console.log(err.message))
    // })

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
    </main>
  )
}

export default Home
