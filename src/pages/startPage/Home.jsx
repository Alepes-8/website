import './Home.css';
import React, { useState, useEffect } from 'react';
import {Categories} from '../../containers';
import {RecipeFeatured} from '../../components';
import  '../../i18n';
import i18n from  'i18next';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

const Home = () => {
  let [recipes, setRecipes] = useState([]);
  const { t } = useTranslation();
  const lngs = [
    { code: 'en', nativeName: 'English' },
    { code: 'fr', nativeName: 'Francais' },
  ];

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
    <Suspense fallback="...is loading">
    <div className="baseBackground">
      <div>
        {lngs.map((lng) => {
          return (
            <button
              className="m-4 p-2 bg-blue-600 rounded"
              key={lng.code}
              type="submit"
              onClick={() => i18n.changeLanguage(lng.code)}
            >
              {lng.nativeName}
            </button>
          );
        })}
      </div>
      <div>
        <h2>{t('Welcome.text')}</h2>
        <p>{t('interpolation_pluralization.text', { count: 5 })}</p>
      </div> 
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
    </Suspense>
  );
};

export default Home;