import './recipePage.css';
import React, { useState } from "react";
import temp from '../../assets/testporkleg.png';


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

  //Tempurary data simulating data aquired from a database
const ingredientsData = [
    {
        recipeId: "1", 
        ingredient: "apple",
        amount: 150,
        format: "gram"
    },
    {
        recipeId: "1", 
        ingredient: "suger",
        amount: 3,
        format: "dl",
    },
    {
        recipeId: "1", 
        ingredient: "cinnamon",
        amount: 3,
        format: "tbsp",
    },
    {
        recipeId: "1", 
        ingredient: "butter",
        amount: 300,
        format: "gram",
    },
    {
        recipeId: "1", 
        ingredient: "mjöl",
        amount: 245,
        format: "gram"
    },
]

const processData = [
    {
        processDescription: "Melt the butter and mix it well with sugar and cinnamon. Cut apples into small slices and mix it with the butter mix. ",
                            
    }
   
]

//this decide what data to print in the table. Change value to change what to get
const column = [
    { heading: 'Ingredience', value: 'ingredient' },
    { heading: 'Amount', value: 'amount' },
]

const TableHeaderItem = ({item, column}) => <th>{item.heading}</th>

//will change acording to how the data is formated when it is recieved
const TableRow = ({item}) => {
    return (
        <tr> 
            {column.map((columnItem, index) => 
                {
                    if(columnItem.value.includes('amount')){
                        return <td>  {item[columnItem.value]} {item["format"]}</td>
                    }
                     
                    return <td> {item[columnItem.value]}</td>
                }
                )}            
        </tr>
    );
}

const TableProcess = ({item}) => <th>{item.processDescription}</th>

const SubmitComment = (event) =>{};


const RecipePage = () => {
    const [textAreaCount, setTextAreaCount] = React.useState(0);

    const recalculate = e => {
      console.log("event value:", e);
      setTextAreaCount(e.target.value.length);
    };
  return (
    <div className="TestRecipePage">
      
        <h1> Title</h1>
        <img src={temp} alt="logo"/>
        <div className='content'>

        </div>

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
                        {ingredientsData.map((item, index) => <TableRow item={item} column={column}/>)}
                    </tbody>
                </table>
            </div>

            <div className='processing'> 
                <h2>Processing</h2> 
                <p>
                    {processData.map((item, index) => <TableProcess item={item}/>)}
                </p>
            </div>
        </div> 

        <div className='Description'>
            <h1>
                Description 
            </h1>
            <div className="container">
                <ReadMore>
                GeeksforGeeks: A Computer Science portal for geeks. 
                It contains well written, well thought and well explained
                computer science, programming articles and quizzes. 
                It provides a variety of services for you to learn, so thrive
                and also have fun! Free Tutorials, Millions of Articles, Live, 
                Online and Classroom Courses ,Frequent Coding Competitions,
                Webinars by Industry Experts, Internship opportunities, and Job
                Opportunities. Knowledge is power!
                </ReadMore>
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