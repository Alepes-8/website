import './recipePage.css';
import React, { useState, useEffect } from "react";
import temp from '../../assets/testporkleg.png';
import { useParams } from 'react-router-dom';
import useToken from '../../useToken';
import { CommentFeatured } from '../../components';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text">
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };

//this decide what data to print in the table. Change value to change what to get
const column = [
    { heading: 'Ingredience', value: 'name' },
    { heading: 'Amount', value: 'description' },
]

const TableHeaderItem = ({item, column}) => <th>{item.heading}</th>

//will change acording to how the data is formated when it is recieved
const TableRow = ({item}) => {
    return (
        <tr> 
            {column.map((columnItem, index) => 
                {
                    if(columnItem.value.includes('description')){
                        return <td>  {item[columnItem.value]} {item["format"]}</td>
                    }
                     
                    return <td> {item[columnItem.value]}</td>
                }
                )}            
        </tr>
    );
}

const TableProcess = ({item}) => <th>{item.name}</th>

const SubmitComment = (event) =>{};




const RecipePage = () => {

    let {id} = useParams();
    let recipeId = id;
    let [recipes, setRecipe] = useState(null);
    let [comments, setComments] = useState(null);
    const {token, setToken } = useToken();

    
    useEffect(() => {
        getRecipe();
    }, []);

    const getRecipe = async() => {
        let recipeResponse = await fetch(`/recipes/${recipeId}/`);
        let recipeData = await recipeResponse.json();
        console.log("recipepage RecipeData: ", recipeData, recipeData.ingredients);

        setRecipe(recipeData);

        
        let commentResponse = await fetch(`/comments/`);
        let commentData = await commentResponse.json();
        setComments(commentData);        
    }

    const [textAreaCount, setTextAreaCount] = React.useState(0);

    const recalculate = e => {
      console.log("event value:", e);
      setTextAreaCount(e.target.value.length);
    };
  return (
    <div className="baseBackground">
      
        <h1 className='recipeh1'> {recipes?.name} </h1>
        <img src={temp} alt="logo" className='recipeImg'/>
  

        <div className='recipe_content'>
            <div className='ingredience'> 
                <h2>Ingredience</h2> 
                <table>
                    <thead>
                        <tr>
                            {column.map((item, index) => <TableHeaderItem item={item}/>)}
                        </tr>
                    </thead>
                    <tbody>
                        {recipes?.ingredients.map((item, index) => <TableRow item={item} column={column}/>)}
                    </tbody>
                </table>
            </div>

            <div className='processing'> 
                <h2>Processing</h2> 
                <p>
                    {recipes?.categories.map((item, index) => <TableProcess item={item}/>)}
                </p>
            </div>
        </div> 

        <div className='Description'>
            <h1 className='recipeh1'>
                Description 
            </h1>
            <div className="container">
                <p>
                {recipes?.description}
                </p>
            </div>
            </div>
        {token 
        ? 
        
        <form className='recipe_comment' onSubmit = {SubmitComment}>
            <div>
            <p> {`${textAreaCount}/250`} </p>
            <textarea name="comments" id="comments" placeholder='Comment...' maxLength="250" onChange={recalculate}/>
            </div>
            <button type="submit"> Submit </button>
        </form>
        
            : <p>Login to comment</p>

        }

        <div> {/*{comments.map((item, index) => <CommentFeatured comment={item}/>)}*/}</div>
        </div>
  );
};

export default RecipePage;