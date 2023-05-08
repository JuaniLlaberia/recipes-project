import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import RecipeDetails from "./components/RecipeDetails";
import { useState } from "react";
import './assets/styles.css'

function App() {
  const [query, setQuery] = useState('');
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home setQuery={setQuery}/>}/>
        <Route path="/recipes" element={<Recipes query={query}/>} />
        <Route path="/recipes/:recipeId" element={<RecipeDetails />} />
      </Routes>
      <p className='create-by'>Created by <a href='https://www.linkedin.com/in/juan-ignacio-llaberia-241b351b3/'>Juan I. Llaberia</a></p>
    </div>
  );
}

export default App;
