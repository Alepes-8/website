import './manageUserComment.css';
import React,{ useState } from 'react';
import axios from 'axios';

const ManageUserComment = ({comments, comment, index}) => {
    const [status, setStatus] = useState("flex");

    //return if comment is empty. If it is already deleted
    if(Object.keys(comment).length === 0){
        return;
    }


    //TODO missing unik variable in the table
    const DeleteComment = async() => {
       const rec = await axios.delete(`/comments/${comment.id}/`);
       if(rec.status === 204){
        setStatus("none")
        comments[index] = {};
       }        
    }

    return( 
        <tr style={{display: `${status}`}} className='User_Template'>
            <button onClick={DeleteComment}> delete</button>
            <b>Recipe:</b> {comment.recipe}
            <b>user:</b> {comment.user} 
            <b>desc:</b> {comment.text} 
        </tr>
    );
}


export default ManageUserComment