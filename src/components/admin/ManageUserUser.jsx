import React from 'react'
import { useState } from 'react';
import './manageUserUser.css';

const ManageUsersUser = ({privilege, user}) => {
    const [showing, setShowing] = useState("flex");
    console.log(user);
    const ChangeAdminStatus = () => {
        alert("no ChangeAdminStatus functionality made yet");
    }
    if(!privilege){
        if(user.is_staff || user.is_superuser){
            return;
        }
    }

    //TODO Test and add feature. Not testable with romans changes
   const DeleteUser = async() => {
    /*alert("no DeleteUser functionality made yet");

    await fetch(`/users/${user.email}/`,{
        method: 'DELETE',
    }).then((response) => {
        console.log(response)
        if(response.status !== 204){
            if(response.status === 500){
                alert("Delete failed. Error on the server side. Error 500");
            }else{
                alert("The user was not deleted as it should")
            }
            return;
        }
    }).catch(function(error){
        console.log('ERROR:', error)
        return;
    })*/
    setShowing('none');
   }
    
    return( 
        <tr id="testing" style={{display: `${showing}`}}  className='User_Template'>
            
            <button onClick={DeleteUser}> delete</button>
            <div className='placement'>
              
            </div>
           
            <b>UserName:</b> {user.email} 
            {privilege
                ? <div><div className='toggle_Box'>
                    <input type="checkbox" defaultChecked={user.is_staff} onClick={ChangeAdminStatus} />
                    
                </div>
                <strong>{"Admin"}</strong>
                </div>: <p></p>
            }
               
        </tr>
    );
}
      


export default ManageUsersUser