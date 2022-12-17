import './userSavedRecipes.css';
import React from 'react';
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

const UserSavedRecipes = () => {
  
  return (
    <div className="UserSavedRecipes">
        <div className='Saved_Recipes'>
          {RecipeData.map((item, index) => <RecipeFeatured recipe={item} />)}
        </div>
    </div>
  );
};



export default UserSavedRecipes;