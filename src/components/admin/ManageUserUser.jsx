import React from 'react'
import { useState } from 'react';
import './manageUserUser.css';
import axios from 'axios';


const ManageUsersUser = ({privilege, user}) => {
    
    const [showing, setShowing] = useState("flex");
  

    const ChangeAdminStatus = () => {
        alert("no ChangeAdminStatus functionality made yet");
    }



   
    //TODO Test and add feature. Not testable with romans changes
   const DeleteUser = async() => {
  
    console.log(user)
    await axios.delete(`http://127.0.0.1:8000/users/${user.id}/`).then(res =>
    {
        if(res.status !== 204){
            if(res.status === 500){
                alert("Delete failed. Error on the server side. Error 500");
            }else{
                alert("The user was not deleted as it should")
            }
            return;
        }
        setShowing('none');  
    })
    
   }
    

    if(!privilege){
        if(user.is_staff || user.is_superuser){
            return;
        }
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