import React from 'react'
import './manageUserUser.css';

const ManageUsersUser = ({user}) => {
    return( 
        <div className='User_Template'>
            
            <button> delete</button>
            <b>ID:</b> {user.ID}
            <b>UserName:</b> {user.UserName} 
                
            
        </div>
    );
}
      


export default ManageUsersUser