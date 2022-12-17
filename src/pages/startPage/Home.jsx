import './Home.css';
import React, { useState, useEffect } from 'react';
import {Categories} from '../../containers';
import {RecipeFeatured} from '../../components';

const RecipeData = [
    {
      title: "Rissoto",
      tag: "A simple but wonderfull recipe for you friday date",
      time: "30"
    },
    {
        title: "Alaskan Hot wings",
        tag: "Have you ever had a wing recipe with snow in it?",
        time: "1h"
      },
      {
        title: "Rissoto",
        tag: "A simple but wonderfull recipe for you friday date",
        time: "30"
      },
      {
          title: "Alaskan Hot wings",
          tag: "Have you ever had a wing recipe with snow in it?",
          time: "1h"
        },

  ];


const Home = () => {
  let [recipes, setRecipes] = useState([])

    useEffect(() => {
        getRecipes()
    }, [])

    let getRecipes = async () => {
        let response = await fetch("recipes/")
        let data = await response.json()
        //console.log('DATA: ', data)
        setRecipes(data)
    }

  return (
    <div className="featured">
            <div className='recipe_alternatives'>
                {recipes.map((recipe, index) => <RecipeFeatured recipe={recipe}/>)}
            </div>
            <div>
                <Categories/>
            </div>
        </div>
   
  );
};

export default Home;