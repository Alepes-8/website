import './Home.css';
import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import {Categories} from '../../containers';

const Home = () => {
  return (
    <div className="SearchPage">
      
      <h1>
      <div className='categories'>
          <Categories/>
        </div>
      </h1>

    </div>
  );
};

export default Home;