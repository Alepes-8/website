import React from 'react';
import './adminManageRecipes.css';
import {ManageUserRecipe} from '../../components'

const AdminManageRecipes = ({recipes,slugs}) => {
    //TODO: check how you want to do the slug. Slug[index] assumes the slug is always on the same position with
    //the recipe. As well as that all slugs has been proparly deleted when the recipe is deleted.
    if(!slugs || !recipes){
        return;
    }
    
    
    return (
        <div>
            {recipes.map((item, index) => 
                <ManageUserRecipe recipe={item} 
                    slugData={slugs.filter((element) => {
                        if(element.recipe.id === item.id){
                            return element;
                        }
                    })
                        
                    }/
                >
            )}
            
        </div>
    )

}

export default AdminManageRecipes