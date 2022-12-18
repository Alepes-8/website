import React, { useState, useEffect } from 'react';
import './adminPage.css';
import { AdminManageUser, AdminManageRecipes, AdminManageComment} from '../../pages';


const AdminPageContentSelection = ({page}) => {
  let [recipes, setRecipes] = useState([])
  let [comment, setComment] = useState([])
  let [users, setUsers] = useState([])




useEffect(() => {
  getRecipes()
}, [])

let getRecipes = async () => {
  let response = await fetch("recipes/")
  let data = await response.json()
  //console.log('DATA: ', data)
  setRecipes(data)
}
  

if(page === 0) {
  return <AdminManageUser  />
}else if(page === 1) {
  return <AdminManageComment  />
}else if(page === 2) {
  return <AdminManageRecipes  recipes = {recipes}/>
}
}
const AdminPage = () => {
    const [count, setCount] = useState(0);

    return (
        <div className='AdminPage'>
            <div className='AdminPage_Button_Navigation'>
                <button onClick={() => setCount(0)}>Manage Users</button>
                <button onClick={() => setCount(1)}>Manage Comments</button>
                <button onClick={() => setCount(2)}>Manage Recipes</button>
            </div>
            <div className='AdminPage_selection_results'>
                <AdminPageContentSelection page={count}/>
            </div>
        </div>
    )
}

export default AdminPage