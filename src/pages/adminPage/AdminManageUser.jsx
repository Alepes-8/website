import React from 'react'
import './adminManageUser.css';
import {ManageUserUser} from '../../components'


const DataUser = [
    {
        ID: 0,
        UserName: "Alex",
    },
    
  ];


const AdminManageUser = () => {
  return (
    <div>
        {DataUser.map((item, index) => <ManageUserUser user={item} />)}
        
    </div>
  )
}

export default AdminManageUser