import React from 'react'
import './manageUserUser.css';
import { Toggle } from './Toggle'


const ManageUsersUser = ({user}) => {
   const ChangeAdminStatus = () => {

   }
    
    return( 
        <div className='User_Template'>
            
            <button> delete</button>
            <div className='placement'>
              
            </div>
           
            <b>ID:</b> {user.ID}
            <b>UserName:</b> {user.UserName} 
            <div className='toggle_Box'>
                <input type="checkbox" defaultChecked={true} onClick={ChangeAdminStatus} />
            </div>
                <strong>{"Admin"}</strong>
            
           
            
        </div>
    );
}
      


export default ManageUsersUser