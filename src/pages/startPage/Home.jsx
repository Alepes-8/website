import './home.css';
import React from 'react';
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
  return (
    <div className="featured">
            <div className='recipe_alternatives'>
                {RecipeData.map((item, index) => <RecipeFeatured recipe={item} />)}
            </div>
            <div>
                <Categories/>
            </div>
        </div>
   
  );
};

export default Home;