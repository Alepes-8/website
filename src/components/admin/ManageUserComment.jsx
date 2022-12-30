import './manageUserComment.css';
import React,{ useState } from 'react';

const ManageUserComment = ({comments, comment, index}) => {
    const [status, setStatus] = useState("flex");

    //return if comment is empty. If it is already deleted
    if(Object.keys(comment).length === 0){
        return;
    }


    //TODO missing unik variable in the table
    const DeleteComment = async() => {
        /*await fetch(`comments/${id}/`,{
            method: 'DELETE',
        }).then((response) => {
            console.log(response)
            if(response.status !== 204){
                if(response.status === 500){
                    alert("Delete failed. Error on the server side. Error 500");
                }else{
                    alert("The recipe was not deleted as it should")
                }
                return;
            }
        }).catch(function(error){
            console.log('ERROR:', error)
            return;
        })
        //Delete the recipe bar from Manage recipe page
        */
        setStatus("none")
        comments[index] = {};
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