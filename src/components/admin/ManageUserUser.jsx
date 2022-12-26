import React from 'react'
import './manageUserUser.css';

const ManageUsersUser = ({privilege, user}) => {
    const ChangeAdminStatus = () => {
        alert("no ChangeAdminStatus functionality made yet");
    }

   const DeleteUser = () => {
    alert("no DeleteUser functionality made yet");
   }
    
    return( 
        <div className='User_Template'>
            
            <button onClick={DeleteUser}> delete</button>
            <div className='placement'>
              
            </div>
           
            <b>UserName:</b> {user.email} 
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