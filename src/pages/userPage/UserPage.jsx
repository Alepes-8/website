import './userPage.css';
import React, { useState } from "react";
import { HiArrowNarrowRight } from 'react-icons/hi';
import tempUserImg from '../../assets/gru.png';

import {LoginPage, Register, UserAddRecipes, UserSavedRecipes, Settings} from '../../pages';


const UserPageContentSelection = ({page}) => {
   
    if(page === 0) {
      return <UserSavedRecipes  />
    }else if(page === 1) {
      return <UserAddRecipes  />
    }else if(page === 2) {
      return <Settings  />
    }
}

const UserPage = ({token, setToken, page}) => {
  const [count, setCount] = useState(0);

  if(!token && page === 1) {
    return <LoginPage token ={token} setToken={setToken} />
  }else if(!token && page === 2) {
    return <Register token ={token} setToken={setToken} />
  }

  return (
    <div className="UserPage">
      <img src={tempUserImg} alt="Avatar" className="avatar"/>
      <div className='AdminPage_Button_Navigation'>
        <button onClick={() => setCount(0)}>Saved Recipes</button>
        <button onClick={() => setCount(1)}>Add Recipes</button>
        <button onClick={() => setCount(2)}>Settings</button>
      </div>
      <div className='User_selection_results'>
        <UserPageContentSelection page={count}/>
      </div>

    </div>
  );
};





export default UserPage;