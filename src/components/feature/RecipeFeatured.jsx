import React from 'react';
import './recipeFeatured.css';
import temp from '../../assets/testporkleg.png';
import {Link} from 'react-router-dom';

const RecipeFeatured = ({recipe}) => {
    return( 
    <div className='preview_Recipe'>
        <li>

            <Link to={`/recipeSlugs/${recipe.slug}`}>
            <img src={recipe.recipe.picture} alt="logo" width="190" height="190"/>

                <div className ="content"> 
                    <div className="name"> 
                        <p> {recipe.recipe.name} </p>
                    </div>
                    <div>
                        <span className="favorite {{food.favorite?'':'not'}}">
                            ❤
                        </span>
                    </div>
                    <div className="product-item-fooder">
                        <div className="tags">
                            <span> 
                            <p> {recipe.recipe.description} </p>
                            </span>
                        </div>
                        <div className="cook-time">
                            <span>🕑</span>
                            {recipe.recipe.portionSize}
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    </div>);
}
      


export default RecipeFeatured