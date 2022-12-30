import React from 'react';
import './adminManageRecipes.css';
import {ManageUserRecipe} from '../../components'

const AdminManageRecipes = ({recipes,slugs}) => {
    //TODO: check how you want to do the slug. Slug[index] assumes the slug is always on the same position with
    //the recipe. As well as that all slugs has been proparly deleted when the recipe is deleted.
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