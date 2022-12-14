import React from 'react'
import './manageUserComment.css';

const ManageUserComment = ({comment}) => {
    return( 
        <div className='User_Template'>
            
            <button> delete</button>
            <b>CommentID:</b> {comment.id}
            <b>Creator:</b> {comment.writer} 
                
            
        </div>
    );
}
      


export default ManageUserComment