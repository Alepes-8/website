import './recipePage.css';
import React from "react";
import temp from '../../assets/temp.png';

const RecipePage = () => {
    return (
      <div className="RecipePage">
        <div className='Recipe_Title'>
          <h1>Temp recipe title</h1>
        </div>
        <div className='Recipe_Image'>
        <img src={temp} alt="logo"/>
        </div>
        <div className='Recipe_Content_Holder'>

          <div className='Recipe_Content'>
            <div className='Recipe_Content_Igredients'>
              <div className='Recipe_Content_Ingredients_Title'>
                <p> Ingredience list </p>
              </div>
              <div className='Recipe_Content_Ingredients_Serving'>
                <p> Test ingredience serving</p>
              </div>
              <div className='Recipe_Content_Ingredients_List'>
                <p> Test Ingredience list</p>
              </div>
            </div>
            <div className='Recipe_Content_Direction'>
              <p> Direction </p>
            </div>
          </div>
        </div>
        <div className='Recipe_Desciption'>
          <div className='Recipe_Desciption_Title'>
              <p>Decription</p>
          </div>
          <div className='Recipe_Desciption_MainText'>
            <p>Main text decsriptbing the history of it</p>
          </div>
        </div>
        <div className='Recipe_Comment_Area'>
          <div className='Recipe_Coment'>
            <div className='Recipe_Comment_Input'>
              <p> Comment area</p>
            </div>
            <div className='Recipe_Comment_Submitment'>
              <p> Future submit button</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default RecipePage;