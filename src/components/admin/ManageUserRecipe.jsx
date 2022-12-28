import React from 'react'
import './manageUserRecipe.css';
import {Link} from 'react-router-dom';



const ManageUsersRecipe= ({recipe, slugData}) => {
    let id = recipe.ID; // can be pk or id, need to check the database


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

        //delete the catagori connection

        await fetch(`slug/${slugData.slug}/`,{
            method: 'DELETE',
        }).then((response) => {
            console.log(response)
            if(response.status !== 204){
                 alert("the slug was not deleted wasn't deleted ");
            }
            
        }).catch(function(error){
            console.log('ERROR:', error)
            return;
        })

        await fetch(`ingredeient-amount/${id}/`,{
            method: 'DELETE',
        }).then((response) => {
            console.log(response)
            if(response.status !== 204){
                 alert("some ingredients wasn't deleted ");
            }
            
        }).catch(function(error){
            console.log('ERROR:', error)
            return;
        })

        //delete the ingredient connection
        await fetch(`catagori-connection/${id}/`,{
            method: 'DELETE',
        }).then((response) => {
            console.log(response)
            if(response.status == 204){
                alert("some catagories wasn't deleted");
                
            }
        }).catch(function(error){
            console.log('ERROR:', error)
            return;
        })

        window.location.reload(false);
    }

    return( 
        <div className='User_Template'>
            
            <button onClick={DeleteRecipe}> delete</button>
            <b>Slug:</b>{slugData.id !== id
                ?<p>Edit(Error)</p>: <p><Link to={`/EditRecipe/${recipe.slug}`}>edit</Link></p>
            }
            
            
            <b>Title:</b> {recipe.name}
            <b>Slug:</b>{slugData.id !== id
                ?<p>Error</p>: <p>{slugData.slug}</p>
            }
            <b>DateCreated:</b> {recipe.creationDate} 
            
                
        </div>
    );
}
      


export default ManageUsersRecipe