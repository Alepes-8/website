import React, { useState ,useEffect} from "react";
import './editRecipe.css';
import RecipePage from "./RecipePage";
import slugify from 'react-slugify';
import { useParams } from 'react-router-dom';



const EditRecipe = () => {
    let {id} = useParams();
    let recipeID = id;

    let [recipe, setRecipe] = useState(null);

    const [action, setAction] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [portionSize, setPortionSize] = useState();
    const [creationDate, setCreationDate] = useState();
    const [categories, setCategories] = useState("");
    const [ingredients, setIngredients] = useState("");

    

    useEffect(() => {
      getRecipe();
    }, []);

    //TODO make sure this works as it should
    const getRecipe = async() => {
        let response = await fetch(`/recipes/${recipeID}/`);
        let data = await response.json();
        setRecipe(data);
    }
      
    const ChangeRecipeInfo = async() => {
        setAction("loading...");
        /*
        let newName =slugify(name)
        let acceptingSlug = false;
        console.log(newName);
        do{
            let response = await fetch(`recipes/${newName}`)
            if(response.status === 404){
            acceptingSlug = true;
            }
            else if(response.status === 200){
            let extra = Math.random().toString(36).substring(2,2+2);
            newName = newName + extra;
            }
        }while(!acceptingSlug);
*/  
        let userName = recipe.name;
        let userDesc = recipe.description;
        let UserPort = recipe.portionSize;
        if(name !== ""){
          userName = name;
        }
        if(description !== ""){
          userDesc = description;
        }
        if(portionSize !== ""){
          UserPort = portionSize;
        }

      fetch(`http://127.0.0.1:8000/recipes/${recipe.id}/`, {
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(   {
            "id": 5,
            "name": userName,
            "description": userDesc,
            "portionSize": UserPort,
            "creationDate": recipe.creationDate,
            "categories": [{"name": "tomato", "description": "5st" },{ "name": "tomato", "description": "5st" }],
            "ingredients": [],
            "author": "admin@gmail.com",
        })
      }).then((response) => {console.log(response)});
     

      }        
      
  return (
    <div className='EditRecipePage'>
        <div className="Editcontent">
            <div className="UserSavedRecipes">
                <h1>AddRecipes</h1>
                {InputTemplate("text" ,"Enter Name","name",name,setName)}
                
                {InputTemplate("text" ,"Enter description","description",description,setDescription)}

                {InputTemplate("number" ,"Enter portionSize","portionSize",portionSize,setPortionSize)}


                {InputTemplate("text" ,"Enter categories","categories",categories,setCategories)}

                {InputTemplate("text" ,"Enter ingredients","ingredients",ingredients,setIngredients)}

            

                <button onClick={ChangeRecipeInfo}> Add recipe</button>
                <p>{action}</p>
            </div>
            <div>
                <RecipePage/>
            
            </div>
        </div>
        
    </div>
  )
}

function InputTemplate (inType, inHolder, inName, inValue, inSet) {
  return (
    <div className="form-group">
      <input
        type = {inType}
        className="form-control form-control-lg"
        placeholder={inHolder}
        name={inName}
        value={inValue}
        onChange={(e) => inSet(e.target.value) }
      />
    </div> 
  );
}
export default EditRecipe