import './home.css';
import React from 'react';
import temp from '../../assets/testporkleg.png';
import {Categories} from '../../containers';


const Home = () => {
  return (
    <div className="featured">
            <div className='recipe_alternatives'>
                <button className='recipe_alternative_button'>
                    <p> Title </p>
                    <img src={temp} alt="Logo" />
                </button>
                <button className='recipe_alternative_button'>
                    <p>  Christian Porklegssssssssssssssssssssssssss </p>
                    <img src={temp} alt="Logo" />
                </button>
                <button className='recipe_alternative_button'>
                    <p> Title </p>
                    <img src={temp} alt="Logo" />
                </button>
                <button className='recipe_alternative_button'>
                    <p> Title </p>
                    <img src={temp} alt="Logo" />
                </button>   
            </div>
            <div>
                <Categories/>
            </div>
        </div>
   
  );
};

export default Home;