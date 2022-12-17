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
                        <p> {recipe.name} </p>
                    </div>
                    <div>
                        <span className="favorite {{food.favorite?'':'not'}}">
                            ❤
                        </span>
                    </div>
                    <div className="product-item-fooder">
                        <div className="tags">
                            <span> 
                            <p> {recipe.description} </p>
                            </span>
                        </div>
                        <div className="cook-time">
                            <span>🕑</span>
                            {recipe.portionSize}
                        </div>
                    </div>
                </div>
            </a>
        </li>
    </div>);
}
      


export default RecipeFeatured