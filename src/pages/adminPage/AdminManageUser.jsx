import React from 'react'
import './adminManageUser.css';
import {ManageUserUser} from '../../components'



const DataUser = [
  {
    username: "user1",
    password: "pass1", 
    admin: false,
    supAdmin:false
  },
  
];



const AdminManageUser = ({ privilege, dataUsers}) => {
  return (
    <div>
        {dataUsers.map((item, index) => <ManageUserUser privilege={privilege} user={item} />)}
        
    </div>
  )
}

export default AdminManageUser