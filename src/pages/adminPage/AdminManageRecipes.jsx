import React from 'react'
import './adminManageRecipes.css';
import {ManageUserRecipe} from '../../components'

const AdminManageRecipes = () => {

    

    const RecipeData = [
        {
            title: "Rissoto",
            dateAdded: '10/2-23'
            
        },
        {
            title: "Alaskan Hot wings",
            dateAdded: '10/5-23'
        },
        {
            title: "Rissoto",
            dateAdded: '15/6-23'
        },
        {
            title: "Alaskan Hot wings",
            dateAdded: '1/1-20'
        },

    ];


    return (
        <div>
            {RecipeData.map((item, index) => <ManageUserRecipe recipe={item} />)}
            
        </div>
    )

}

export default AdminManageRecipes