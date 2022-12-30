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
    { heading: 'Amount', value: 'amount' },
]

const TableHeaderItem = ({item, column}) => <th>{item.heading}</th>

//will change acording to how the data is formated when it is recieved
const TableRow = ({item, servings}) => {
    return (
        <tr> 
            {column.map((columnItem, index) => 
                {
                    if(columnItem.value.includes('amount')){
                      var amount = item.amount
                      var removeSpace = amount.replace(" ", ""); //removes all whitespaces in the string
                      removeSpace = removeSpace.match(/(\d+|[^\d]+)/g).join(' '); //creates a single space between the number and letters
                      var splitString = removeSpace.split(" "); //splits the string at the whitespace, [number, letters]
                      console.log(splitString)
                      var newAmount

                      //changes the amount depending on servings menu
                      if(splitString[1] != null){
                        newAmount = splitString[0] * servings + splitString[1]
                      }
                      else{
                        newAmount = splitString[0] * servings
                      }
                      return <td>  {newAmount} </td>
                    }
                     
                    return <td> {item.ingredient.name}</td>
                }
                )}            
        </tr>
    );
}

const TableProcess = ({item}) => <th>{item.name}</th>


const SubmitComment = (event) =>{};

//Items for the drop down menu
const options = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '4', value: '4' },
    { label: '8', value: '8' },
  ];

  const Dropdown = ({ label, value, options, onChange }) => {
    return (
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    );
   };


const RecipePage = () => {
    let {id} = useParams();
    let recipeId = id;
    let [recipes, setRecipe] = useState(null);
    let [comments, setComments] = useState(null);
    let [comment, setComment] = useState();
    const {token, setToken } = useToken();

    
    useEffect(() => {
        getRecipe();
        getComments();
    }, []);

    const SubmitComment = () =>{
        fetch('comments/', {
            method:'POST',
            headers:{
              'Content-type':'application/json',
            },
            body:JSON.stringify(   {
                "recipe": null,
                "user": null,
                "text": comment
            })
          }).then((response) => {console.log(response)});
    };

    const getRecipe = async() => {

        let response = await fetch(`/recipeSlugs/${recipeId}/`);
        let data = await response.json();
        //console.log('DATA: ', data);
        setRecipe(data);

    }

    const getComments = async() => {
        let commentResponse = await fetch(`/comments/`);
        let commentData = await commentResponse.json();
        console.log("commentData recipePage",commentData)
        setComments(commentData);     
    
    }
    
    const [textAreaCount, setTextAreaCount] = React.useState(0);

    const recalculate = e => {
      setTextAreaCount(e.target.value.length);
      setComment(e.target.value);

    };

    const [servings, setServings] = useState('1');

    const handleChange = (event) => {
        setServings(event.target.value);
    };

  return (
    <div className="baseBackground">

        <h1 className='recipeh1'> {recipes?.recipe.name} </h1>
        <img src={recipes?.recipe.picture} alt="logo" className='recipeImg'/>

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
                        {recipes?.recipe.ingredients.map((item, index) => <TableRow item={item} column={column} servings={servings}/>)}
                    </tbody>
                </table>
                
                <Dropdown label="Number of servings " options={options} value={servings} onChange={handleChange}/>
                
            </div>

            <div className='processing'> 
                <h2>Categories</h2> 
                <p>
                    {recipes?.recipe.categories.map((item, index) => <TableProcess item={item}/>)}
                </p>
            </div>
        </div> 

        <div className='Description'>
            <h1 className='recipeh1'>
                Description 
            </h1>
            <div className="container">
                <p>
                {recipes?.recipe.description}
                </p>
            </div>
            </div>
        {token 
        ?         
                <div className='recipe_comment'>
                        <div>
                        <p> {`${textAreaCount}/250`} </p>
                        <textarea name="comments" id="comments" placeholder='Comment...' maxLength="250"  onChange={recalculate}/>
                        </div>
                        <button type="submit" onClick={SubmitComment}> Submit </button>
                    </div>
        
            : <p>Login to comment</p>
        }        
        
        <div> 
            {comments !== null
            ?comments.filter(element => element.recipe.toString() ===  recipeId).map((item) => <CommentTemplate com={item}/>) 
            : <p></p>
            }
           
        </div>
    </div>
  );
  
};

const CommentTemplate = ({com}) => {
    let [comments, setComments] = useState(false);

    return(
        <diV>
            {comments
            ? <button onClick={() => setComments(false)} > Hide Comment</button>
            : <button onClick={() => setComments(true)} > Show Comment by { com.user}</button>}
            {comments && (
            <div>
                {com.text}
            </div>
            )}
        </diV>
        
    );
}

export default RecipePage;