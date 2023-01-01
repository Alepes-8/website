import React, { useState ,useEffect} from "react";
import './editRecipe.css';
//import slugify from 'react-slugify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import slugify from "react-slugify";
import useToken from '../../useToken';
import {LoginPage, RecipePage} from '../../pages';


function timeout(number) {
  return new Promise( res => setTimeout(res, number) );
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

const EditRecipe = () => {

    let {id} = useParams();
    let {status} = useParams();

    let recipeSlug = id;
    let recipeState = status;

    let [recipe, setRecipe] = useState(null);
    const {token, setToken } = useToken();

    const [action, setAction] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [portionSize, setPortionSize] = useState();
    const [categories, setCategories] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [testing, setTesting] = useState(null);

    

    useEffect(() => {
      if(token){
        if(token.admin || token.supAdmin){
          if(recipeState === "0"){
            setTesting(<RecipePage/>);
          }else{
            setTesting(null)
          }
          getRecipe();
        }
       
      }
      
    }, []);

    if(!token){
      if(!token.admin || !token.supAdmin){
        return <LoginPage token ={token} setToken={setToken} />
      }
    }

    //TODO make sure this works as it should
    const getRecipe = async() => {
      if(recipeState === "0"){
        let response = await fetch(`/recipeSlugs/${recipeSlug}/`);
        let data = await response.json();
        setRecipe(data.recipe);
      }else{
        let response = await fetch(`/recipes/${recipeState}/`);
        let data = await response.json();
        setRecipe(data);
      }
    }
      
    //TODO Seems to be a problem with changing recipes with romans changes
    const ChangeRecipeInfo = async() => {
        setAction("loading...");
        let userName = recipe.name;
        let userDesc = recipe.description;
        let UserPort = recipe.portionSize;
        let newSlug;
        if(name !== ""){
          userName = name;
          if(recipeState === "0"){
            newSlug =slugify(userName)
            let acceptingSlug = false;
            console.log(newSlug);
            do{
                let response = await fetch(`/recipeSlugs/${newSlug}/`)
                if(response.status === 404){
                  acceptingSlug = true;
                }
                else if(response.status === 200){
                  let extra = Math.random().toString(36).substring(2,2+2);
                  newSlug = newSlug + extra;
                }
            }while(!acceptingSlug);
          }
        }
        if(description !== ""){
          userDesc = description;
        }
        if(portionSize !== ""){
          UserPort = portionSize;
        }

        if(!portionSize){
          UserPort = recipe.portionSize;
        }
      
        const userData = {
          
            "name": userName,
            "description": userDesc,
            "portionSize": UserPort,
            "creationDate": recipe.creationDate,
            "categories": [],
            "ingredients": [],
            "author": recipe.author,

        };

        if(recipeState === "0"){
          let finalPush = { "recipe":userData, "slug":"Chessesting"}
          await axios.put(`/recipeSlugs/Chessesting/`, finalPush).then(res => setRecipe(res.data)).catch(error => console.log(error))
        }
        else{
          console.log(userData)
          const headers = {
            'Content-type':'application/json',
          }     
          await axios.put(`/recipes/${recipe.id}/`, userData, {headers }).then(res => setRecipe(res.data)).catch(error => console.log(error))
        }
        
        if(recipeState === "0"){
          setTesting(null)
          await timeout(1000);
          setTesting(<RecipePage/>);
        }
        setAction("success");
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
                {testing}
            </div>
        </div>
        
    </div>
  )
}

export default EditRecipe