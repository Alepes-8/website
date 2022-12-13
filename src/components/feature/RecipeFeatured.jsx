import React from 'react'
import './recipeFeatured.css';
import temp from '../../assets/testporkleg.png';

const RecipeFeatured = ({recipe}) => {
    return( 
    <div className='preview_Recipe'>
        <li>
            <a href='/RecipePage'>
            <img src={temp} alt="logo"/>
                <div className ="content"> 
                    <div className="name"> 
                        <p> {recipe.title} </p>
                    </div>
                    <div className="product-item-fooder">
                        <div className="tags">
                            <span> 
                            <p> {recipe.tag} </p>
                            </span>
                        </div>
                        <div className="cook-time">
                            <span>🕑</span>
                            {recipe.time}
                        </div>
                    </div>
                </div>
            </a>
        </li>
    </div>);
}
      


export default RecipeFeatured