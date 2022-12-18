import React from 'react';
import './adminManageRecipes.css';
import {ManageUserRecipe} from '../../components'

const AdminManageRecipes = ({recipes}) => {

    return (
        <div>
            {recipes.map((item, index) => <ManageUserRecipe recipe={item} />)}
            
        </div>
    )

}

export default AdminManageRecipes