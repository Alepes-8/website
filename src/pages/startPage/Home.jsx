import './home.css';
import React from 'react';
import temp from '../../assets/testporkleg.png';
import {Categories} from '../../containers';


const Home = () => {
  return (
    <div className="featured">
            <div className='recipe_alternatives'>
               
                    <a href='/RecipePage'>
                        <button className='recipe_alternative_button'>
                            <p> Christian Pork Butt </p>
                            <img src={temp} alt="Logo" />
                        </button>
                    </a>
                    <a href='/RecipePage'>
                        <button className='recipe_alternative_button'>
                            <p> Title </p>
                            <img src={temp} alt="Logo" />
                        </button>
                    </a>
                    <a href='/RecipePage'>
                        <button className='recipe_alternative_button'>
                            <p> Title </p>
                            <img src={temp} alt="Logo" />
                        </button>
                    </a>
                    <a href='/RecipePage'>
                        <button className='recipe_alternative_button'>
                            <p> Title </p>
                            <img src={temp} alt="Logo" />
                        </button>
                    </a> 
                
            </div>
            <div>
                <Categories/>
            </div>
        </div>
   
  );
};

export default Home;