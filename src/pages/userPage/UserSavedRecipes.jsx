import './userSavedRecipes.css';
import React from 'react';
import {RecipeFeatured} from '../../components';



const UserSavedRecipes = ({recipes}) => {
  
  return (
    <div>
        <div className='Saved_Recipes'>
          {recipes.map((item, index) => <RecipeFeatured recipe={item} />)}
        </div>
    </div>
  );
};



export default UserSavedRecipes;