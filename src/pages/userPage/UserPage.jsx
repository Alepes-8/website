import './userPage.css';
import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import tempUserImg from '../../assets/gru.png';
import {RecipeFeatured} from '../../components';

import {LoginPage, Register} from '../../pages';


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

const SortFavorit = () => {
  
}

const UnFavoritise = () => {
  
}

const UserPage = ({token, setToken, page}) => {
  

  if(!token && page === 1) {
    return <LoginPage token ={token} setToken={setToken} />
  }else if(!token && page === 2) {
    return <Register token ={token} setToken={setToken} />
  }

  return (
    <div className="UserPage">
      <img src={tempUserImg} alt="Avatar" className="avatar"/>
      <br></br>
      <h1>Saved Recipes</h1>
      <div className='BackgroundLikeButtons'>
        <div className='Saved_Recipes'>
          {RecipeData.map((item, index) => <RecipeFeatured recipe={item} />)}
       
        </div>
      </div>
      {/*<div className='Saved_Recipes'>
                  {RecipeData.map((item, index) => <RecipeBox recipe={item} />)}
       
      </div>*/}
    </div>
  );
};

export default UserPage;