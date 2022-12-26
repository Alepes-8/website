import './userPage.css';
import React, { useState , useEffect} from "react";
import { HiArrowNarrowRight } from 'react-icons/hi';
import tempUserImg from '../../assets/gru.png';

import {LoginPage, Register, UserAddRecipes, UserSavedRecipes, Settings, AdminManageRecipes, AdminManageComment, AdminManageUser} from '../../pages';



const UserPage = ({token, setToken, page}) => {
  const [count, setCount] = useState(0);
  let [recipes, setRecipes] = useState([])
  let [comment, setComment] = useState([])
  let [users, setUsers] = useState([])
  let [myRecipes, setMyRecipes] = useState()


  const UserPageContentSelection = ({page}) => {
   
    if(page === 0) {
      return <UserSavedRecipes recipes ={recipes} />
    }else if(page === 1) {
      return(
      <div className='User_selection_results'>
        <UserAddRecipes  />
      </div>);
    }else if(page === 3) {
      return <AdminManageRecipes  recipes = {recipes}/>
    }else if(page === 4) {
      return <AdminManageComment  />
    }else if(page === 5) {
      return <AdminManageUser  privilege={token.supAdmin} dataUsers={users}/>
    }else if(page === 2) {
      return (
      <div className='User_selection_results'>
        <Settings  />
      </div>);
    }
}

  useEffect(() => {
    if(token){
      getRecipes();
      getUsers();
    }
  }, [])

  let getRecipes = async () => {
    let response = await fetch("recipes/")
    let data = await response.json()
    //console.log('DATA: ', data)
    setRecipes(data)
  }
  
  
  let getUsers = async() => {
    let response = await fetch("users/")
    let data = await response.json()
    //console.log('DATA: ', data)
    let user = data.filter((element) => {if(element.email === token.email){
      return element;
    }})
    setMyRecipes(user[0].savedRecipes) //only my recipes
    setUsers(data) //all users
  }

  if(!token && page === 1) {
    return <LoginPage token ={token} setToken={setToken} />
  }else if(!token && page === 2) {
    return <Register token ={token} setToken={setToken} />
  }


  const NavigationButtons =()=>{
    return(
      <div className='AdminPage_Button_Navigation'>
        <button onClick={() => setCount(0)}>My Recipes</button>
        {token.admin || token.supAdmin
        ? <AdminNavigation/>: <button onClick={() => setCount(2)}>Settings</button>
    }
        
        


      </div>
    );
  }

  const AdminNavigation = () => {
    return(        
    <div>
      <button onClick={() => setCount(1)}>Add Recipes</button>
      <button onClick={() => setCount(3)}>Manage Recipes</button>
      <button onClick={() => setCount(4)}>Manage Comments</button>
      <button onClick={() => setCount(5)}>Manage Users</button>
      <button onClick={() => setCount(2)}>Settings</button>
    </div>);
  }

  return (
    <div className='AdminPage'>
      
      <NavigationButtons/>
      <div className='AdminPage_selection_results'>
        <UserPageContentSelection page={count}/>
      </div>
      
    </div>
   
  );
};





export default UserPage;