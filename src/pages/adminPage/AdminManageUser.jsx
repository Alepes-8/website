import React from 'react'
import './adminManageUser.css';
import {ManageUserUser} from '../../components'


const DataUser = [
    {
        ID: 0,
        UserName: "Alex",
    },
    {
        ID: 1,
        UserName: "Oliver",
    },
    {
        ID: 2,
        UserName: "Oskar",
    },
    {
        ID: 3,
        UserName: "Roman",
    },
    {
        ID: 4,
        UserName: "Emma",
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