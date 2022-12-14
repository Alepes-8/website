import './Home.css';
import React, {useState, useEffect} from 'react';
import temp from '../../assets/testporkleg.png';
import {Categories} from '../../containers';
import { async } from 'q';


const Home = () => {

    let [recipes, setRecipes] = useState([])

    useEffect(() => {
        getRecipes()
    }, [])

    let getRecipes = async () => {
        let response = await fetch("http://127.0.0.1:8000/recipes/")
        let data = await response.json()
        //console.log('DATA: ', data)
        setRecipes(data)
    }

  return (
    <div className="featured">
            <div className='recipe_alternatives'>
               
                {recipes.map((recipe, index) => (
                    <a href='/RecipePage'>
                        <button className='recipe_alternative_button'>
                        <h3 key={index}> {recipe.name} </h3>
                            <img src={temp} alt="Logo" />
                        </button>
                    </a>
                ))}

                    
                    
                
            </div>
            <div>
                <Categories/>
            </div>
        </div>
   
  );
};

export default Home;