import React from 'react'
import './recipeFeatured.css';
import temp from '../../assets/testporkleg.png';

const RecipeFeatured = ({recipe}) => {
    return( 
    <div className='preview_Recipe'>
        <li>
            <a href='/RecipePage'>
            <img src={temp} alt="logo"/>
                <div class ="content"> 
                    <div class="name"> 
                        <p> {recipe.title} </p>
                    </div>
                    <div class="product-item-fooder">
                        <div class="tags">
                            <span> 
                            <p> {recipe.tag} </p>
                            </span>
                        </div>
                        <div class="cook-time">
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