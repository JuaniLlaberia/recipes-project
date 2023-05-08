import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined);

export const FavContextProvider = ({children}) => {

    const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
        const favRecStored = JSON.parse(localStorage.getItem('FAV_RECIPES'));
        return favRecStored
    });

    useEffect(() => {
        localStorage.setItem('FAV_RECIPES', JSON.stringify(favoriteRecipes));
    }, [favoriteRecipes])


    const addFav = (name, img, id) => {

        if (favoriteRecipes.find(recipe => recipe.recipeID === id)) return;

        setFavoriteRecipes(prev => {
            return [...prev, {
                name:name,
                srcImg:img,
                recipeID:id
            }]
        })
    };

    const removeFav = (id) => {
        const favsCopy = [...favoriteRecipes];
        const recipeToRemove = favsCopy.findIndex(recipe => recipe.recipeID === id)
        favsCopy.splice(recipeToRemove,1);

        setFavoriteRecipes(favsCopy);
    };

    return <FavoriteContext.Provider value={{favoriteRecipes, addFav, removeFav}}>
        {children}
    </FavoriteContext.Provider>
}

export const useFavContext = () => useContext(FavoriteContext)