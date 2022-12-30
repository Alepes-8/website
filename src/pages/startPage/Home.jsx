import './Home.css';
import React, { useState, useEffect } from 'react';
import {Categories} from '../../containers';
import {RecipeFeatured} from '../../components';

const Home = () => {
  let [recipes, setRecipes] = useState([]);

  const [youtubeID] = useState('2Qj8PhxSnhg')

    useEffect(() => {
        getRecipes();
    }, [])

    let getRecipes = async () => {
        let response = await fetch("/recipeSlugs/")
        let data = await response.json()
        console.log('DATA: ', data)
        setRecipes(data)
    }

  return (
    <div className="baseBackground">
            <h1>How a real chef cooks</h1>
                        
              <iframe className='video'
                      sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                      src={`https://youtube.com/embed/${youtubeID}?autoplay=0&showinfo=0&controls=1&modestbranding=1&origin=1`}>
              </iframe>
              
            <div className='recipe_alternatives'>
                {recipes.map((recipe, index) => <RecipeFeatured recipe={recipe}/>)}
            </div>
            <div>
                <Categories/>
            </div>
              
              
        </div>
   
  );
};

export default Home;