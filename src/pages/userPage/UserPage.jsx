import './userPage.css';
import React, { useState , useEffect} from "react";
import {LoginPage, Register, UserAddRecipes, ResetPassWord, Settings, AdminManageRecipes, AdminManageComment, AdminManageUser} from '../../pages';


import axios from 'axios';
axios.defaults.headers.common = {Accept:`application/json`}


axios.interceptors.request.use(
  config => {
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      if(userToken){
        if (userToken.token) {
          config.headers['Authorization'] =  `Token ${userToken.token}`;
        }
      }
      config.headers['Content-Type'] = 'application/json';
      console.log("hejsan", config.url, config.url === '/recipes/40/', config.url.includes("recipes"));

      if(config.url.includes("recipes")){
        config.headers['Content-Type'] = 'multipart/form-data';
      }
      return config;
  },
  error => {
      Promise.reject(error)
});

const UserPage = ({token, setToken, page}) => {
  const [count, setCount] = useState(0);
  let [recipes, setRecipes] = useState([])
  let [slugs, setSlugs] = useState()
  let [comments, SetComments] = useState()//TODO

  let [users, setUsers] = useState([])
  let [myRecipes, setMyRecipes] = useState()

  const [ingData, setIngData] = useState();
  const [catData, setCatData] = useState();


  const UserPageContentSelection = ({page}) => {
   
    if(page === 0) {
      //return <UserSavedRecipes recipes ={recipes} />
    }else if(page === 1) {
      return(
      <div className='User_selection_results'>
        <UserAddRecipes ingData={ingData} catData={catData}  />
      </div>);
    }else if(page === 3) {
      return <AdminManageRecipes  recipes={recipes} slugs={slugs}/>
    }else if(page === 4) {
      return <AdminManageComment  comments={comments}/>
    }else if(page === 5) {
      return <AdminManageUser  privilege={token.supAdmin} dataUsers={users}/>
    }else if(page === 2) {
      return (
      <div className='User_selection_results'>
        <Settings  token={token} setToken={setToken}/>
      </div>);
    }
  }



  useEffect(() => {
    if(token){
      if(token.admin || token.supAdmin){
        getRecipes();
        getUsers();
        getCat();
        getIng();
        getSlug();
        getComments();
      }
    }
  }, [])

  

  let getSlug =async() => {//TODO
    let response = await fetch("/recipeSlugs/")
    let data = await response.json()
    console.log("recipeSlugs", data);
    setSlugs(data)
  }

  let getIng = async () => {
    let response = await fetch("/ingredients/")
    let data = await response.json()
    console.log("ingredients", data);
    setIngData(data)
  }

  let getCat = async () => {
    let response = await fetch("/categories/")
    let data = await response.json()
    console.log("categories", data);
    setCatData(data)
  }


  let getRecipes = async () => {
    let response = await fetch("recipes/")
    let data = await response.json()
    console.log("recipes", data);
    setRecipes(data)
  }

  let getComments = async () => {
    let response = await fetch("comments/")
    let data = await response.json()
    console.log("comments", data);
    SetComments(data)
  }
  
  
  let getUsers = async() => {
    axios.get("http://127.0.0.1:8000/users/").then(res => {
      console.log("users", res);
      setUsers(res.data)
    })
  }

  if(!token && page === 1) {
    return <LoginPage token ={token} setToken={setToken} />
  }else if(!token && page === 2) {
    return <Register token ={token} setToken={setToken} />
  }else if(!token && page === 3) {
    return <ResetPassWord/>
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