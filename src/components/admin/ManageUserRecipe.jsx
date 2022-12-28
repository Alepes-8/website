import React from 'react'
import './manageUserRecipe.css';
import {Link} from 'react-router-dom';
import { useState } from 'react';



  
const ManageUsersRecipe= ({recipes, recipe, index ,slugData}) => {
    let id = recipe.id; // can be pk or id, need to check the database
    const [status, setStatus] = useState("flex");

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
        
        setStatus("none")
        recipes[index] = {};
    }

    return( 
        <tr style={{display: `${status}`}} className='User_Template'>
            
            <button onClick={DeleteRecipe}> delete</button>
            <b>Slug:</b> <p><Link to={`/EditRecipe/${recipe.id}`}>edit</Link></p>
          
            
            
            <b>Title:</b> {recipe.name}
            <b>Slug:</b>{slugData.length != 1
                ?<p className='Error'>Error</p>: <p>{slugData[0].slug}</p>
            }
            <b>DateCreated:</b> {recipe.creationDate} 
            
                
        </tr>
    );
}
      


export default ManageUsersRecipe