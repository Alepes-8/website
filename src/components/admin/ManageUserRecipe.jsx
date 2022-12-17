import React from 'react'
import './manageUserRecipe.css';



const ManageUsersRecipe= ({recipe}) => {
    let slug = recipe.slug

    const DeleteRecipe = async () => {

        await fetch(`recipes/${slug}/`,{
            method: 'DELETE',
        }).then((response) => {
            console.log(response)
            if(response.status == 204){
                window.location.reload(false);
            }
        }).catch(function(error){
            console.log('ERROR:', error)
        })

    }

    return( 
        <div className='User_Template'>
            
            <button onClick={DeleteRecipe}> delete</button>
            <b>Title:</b> {recipe.name}
            <b>Slug:</b> {slug}
            <b>DateCreated:</b> {recipe.creationDate} 
                
        </div>
    );
}
      


export default ManageUsersRecipe