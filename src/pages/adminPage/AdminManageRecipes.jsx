import React from 'react';
import './adminManageRecipes.css';
import {ManageUserRecipe} from '../../components'

const AdminManageRecipes = ({recipes,slugs}) => {
    //TODO: check how you want to do the slug. Slug[index] assumes the slug is always on the same position with
    //the recipe. As well as that all slugs has been proparly deleted when the recipe is deleted.
    return (
        <div>
            {recipes.map((item, index) => <ManageUserRecipe recipe={item} slugData={slugs[index]}/>)}
            
        </div>
    )

}

export default AdminManageRecipes