import React from 'react';
import './adminManageRecipes.css';
import {ManageUserRecipe} from '../../components'

const AdminManageRecipes = ({recipes,slugs}) => {
    if(!slugs || !recipes){
        return;
    }
    let index = -1;
    

    return (
        <div>
            {recipes.map((item) => 
                <ManageUserRecipe 
                    recipes ={recipes} 
                    recipe={item} 
                    slugData={slugs.filter((element) => element.recipe.id === item.id)}
                    index={index +=1}
                />
            )}
        </div>
    )

}

export default AdminManageRecipes