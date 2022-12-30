import React from 'react'
import './manageUserRecipe.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import slugify from 'react-slugify';
import axios from 'axios';



  
const ManageUsersRecipe= ({recipes, recipe, index ,slugData}) => {
    let id = recipe.id; // can be pk or id, need to check the database
    const [status, setStatus] = useState("flex");

    //make sure to return if the recipe has been deleted
    if(Object.keys(recipe).length === 0){
        return;
    }

    const DeleteRecipe = async () => {        
        //delete the recipe
      await fetch(`recipes/${id}/`,{
            method: 'DELETE',
        }).then((response) => {
            console.log(response)
            if(response.status !== 204){
                if(response.status === 500){
                    alert("Delete failed. Error on the server side. Error 500");
                }else{
                    alert("The recipe was not deleted as it should")
                }
                return;
            }
        }).catch(function(error){
            console.log('ERROR:', error)
            return;
        })
        //Delete the recipe bar from Manage recipe page
        setStatus("none")
        recipes[index] = {};
    }

    //TODO Create a new slug
    const CreateSlug = async () => {     
        alert("testing create slug ") 
        let newName =slugify(recipe.name)
        let acceptingSlug = false;
        console.log(newName);
        do{
            let response = await fetch(`/recipeSlugs/${newName}`)
            if(response.status === 404){
            acceptingSlug = true;
            }
            else if(response.status === 200){
            let extra = Math.random().toString(36).substring(2,2+2);
            newName = newName + extra;
            }
        }while(!acceptingSlug); 
        console.log(newName)
        const userData = {
            "recipe":3,
            "slug": "one-pot-spaghetti"
        };

        const headers = {
            'Content-type':'application/json',
        };

        axios.post("/recipeSlugs/", userData, { headers })
        .then(response => {
        console.log(response)
        })
    }

    return( 
        <tr style={{display: `${status}`}} className='User_Template'>
            <button onClick={DeleteRecipe}> delete</button>
            {slugData[0]
                ?<p><Link to={`/EditRecipe/${slugData[0].slug}/0`}>edit</Link></p>
                :  <p><button onClick={CreateSlug}> create slug</button><Link to={`/EditRecipe/none/${recipe.id}`}>edit</Link></p>
            }
            <b>Title:</b> {recipe.name}
            <b>Slug:</b>{slugData.length != 1
                ?<p className='Error'>Error</p>: <p>{slugData[0].slug}</p>
            }
            <b>DateCreated:</b> {recipe.creationDate} 
            
        </tr>
    );
}
      


export default ManageUsersRecipe