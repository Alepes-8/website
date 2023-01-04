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

    
    const [cImage, setCImage] = useState();


    const handleImageChange = (e) => {
      setCImage(e.target.files[0]);
    };


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
      
    const ChangeRecipeInfo = async() => {
        setAction("loading...");
        let userName = recipe.name;
        let userDesc = recipe.description;
        let UserPort = recipe.portionSize;
        
        if(description !== ""){
          userDesc = description;
        }
        if(portionSize !== ""){
          UserPort = portionSize;
        }

        if(!portionSize){
          UserPort = recipe.portionSize;
        }
      
        const headers = {
          'Content-type':'application/json',
          "Content-Type": "multipart/form-data",
        }    

        const imagedata = {
          "name": userName,
          "description": userDesc,
          "portionSize": 1,
          "picture": cImage 
        };     
        
        if(recipeState === "0"){
          await axios.put(`/recipes/${recipe.id}/`,imagedata).then(res => setRecipe(res.data)).catch(error => console.log(error))
        }
        else{
          await axios.put(`/recipes/${recipe.id}/`, imagedata).then(res => setRecipe(res.data)).catch(error => console.log(error))
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
                    
                <input
                  className=""
                  required
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/gif"
                  onChange={(e) => {
                    handleImageChange(e);
                  }}
                />
                {InputTemplate("text" ,"Enter Name","name",name,setName)}
                {InputTemplate("text" ,"Enter description","description",description,setDescription)}
                {InputTemplate("number" ,"Enter portionSize","portionSize",portionSize,setPortionSize)}
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