import React from 'react'
import './manageUserUser.css';

const ManageUsersUser = ({privilege, user}) => {
   const ChangeAdminStatus = () => {

   }
    
    return( 
        <div className='User_Template'>
            
            <button> delete</button>
            <div className='placement'>
              
            </div>
           
            <b>UserName:</b> {user.username} 
            {privilege
                ? <div><div className='toggle_Box'>
                    <input type="checkbox" defaultChecked={user.admin} onClick={ChangeAdminStatus} />
                    
                </div>
                <strong>{"Admin"}</strong>
                </div>: <p></p>
            }
               
            
           
            
        </div>
    );
}
      


export default ManageUsersUser