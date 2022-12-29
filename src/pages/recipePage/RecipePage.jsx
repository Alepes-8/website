import './recipePage.css';
import React, { useState, useEffect } from "react";
import temp from '../../assets/testporkleg.png';
import { useParams } from 'react-router-dom';


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
                    if(columnItem.heading.includes('amount')){//It works but try to solve it in a better way if time allows
                        return <td>  {columnItem.value * servings} {item["format"]}</td>
                    }
                     
                    return <td> {item[columnItem.value]}</td>
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
    
    useEffect(() => {
        getRecipe();
    }, []);

    const getRecipe = async() => {
        let response = await fetch(`/recipeSlugs/${recipeId}/`);
        let data = await response.json();
        //console.log('DATA: ', data);
        setRecipe(data);
    }

    const [textAreaCount, setTextAreaCount] = React.useState(0);

    const recalculate = e => {
      console.log("event value:", e);
      setTextAreaCount(e.target.value.length);
    };

    const [servings, setServings] = useState('1');

    const handleChange = (event) => {
        setServings(event.target.value);
    };

  return (
    <div className="TestRecipePage">
      
        <h1> {recipes?.recipe.name} </h1>
        <img src={temp} alt="logo"/>
  

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
            <h1>
                Description 
            </h1>
            <div className="container">
                <p>
                {recipes?.recipe.description}
                </p>
            </div>
        </div>
            <form className='recipe_comment' onSubmit = {SubmitComment}>
                <div>
                <p> {`${textAreaCount}/250`} </p>
                <textarea name="comments" id="comments" placeholder='Comment...' maxLength="250" onChange={recalculate}/>
                </div>
                <button type="submit"> Submit </button>
            </form>
        </div>
  );
};

export default RecipePage;