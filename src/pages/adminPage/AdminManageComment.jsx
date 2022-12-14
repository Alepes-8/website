import React from 'react'
import './adminManageComment.css';
import {ManageUserComment} from '../../components'

const AdminManageComment = () => {
    

    const CommentingData = [
        {
            id: 0,
            writer: 'Alex'
            
        },
        {
            title: 1,
            writer: 'Alex'
        },
        {
            title: 2,
            writer: 'Oliver'
        },
        {
            title: 3,
            writer: 'Oskar'
        },

    ];

  return (
     <div>
        {CommentingData.map((item, index) => <ManageUserComment comment={item} />)}
        
    </div>
  )
}

export default AdminManageComment