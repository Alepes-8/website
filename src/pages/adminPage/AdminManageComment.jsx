import React from 'react'
import './adminManageComment.css';
import {ManageUserComment} from '../../components'

const AdminManageComment = ({comments}) => {
    
    if(!comments){
        return;
    }
    let index = -1;
  return (
     <div>
        {comments.map((item) => <ManageUserComment comments ={comments} comment={item} index ={index+=1}/>)}
        
    </div>
  )
}

export default AdminManageComment