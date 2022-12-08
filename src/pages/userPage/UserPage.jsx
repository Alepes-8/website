import './userPage.css';
import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';

import {LoginPage, Register} from '../../pages';




const UserPage = ({token, setToken, page}) => {
  

  if(!token && page === 1) {
    return <LoginPage token ={token} setToken={setToken} />
  }else if(!token && page === 2) {
    return <Register token ={token} setToken={setToken} />
  }

  return (
    <div className="UserPage">
      
        <p> UserPage</p>

    </div>
  );
};

export default UserPage;