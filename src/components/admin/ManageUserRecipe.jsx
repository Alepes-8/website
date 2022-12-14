import React from 'react'
import './manageUserRecipe.css';

const ManageUsersRecipe= ({recipe}) => {
    return( 
        <div className='User_Template'>
            
            <button> delete</button>
            <b>Title:</b> {recipe.title}
            <b>DateCreated:</b> {recipe.dateAdded} 
                
            
        </div>
    );
}
      


export default ManageUsersRecipe