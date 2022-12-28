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
      
    const CheckContent = () => {
        setAction("checking value");
        {/*if(name === ""){
            setName(recipes.name);
        }
        if(description ===""){
          setDescription(recipes.description);
        }
        if(!portionSize){
          setPortionSize(recipes.portionSize);
        }*/}
        
       
        ChangeRecipeInfo()
      }

    const ChangeRecipeInfo = async() => {
        setAction("loading...");
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

       

        //TODO change according to the new setup and add recipe code which is still to do as well
        fetch(`/recipes/${recipe.id}/`, {
          method:'PUT',
          headers:{
            'Content-type':'application/json',
          },
          body:JSON.stringify({"name": name,
          "slug": newName,
          "description": recipe.description ,
          "portionSize": recipe.portionSize,
          "creationDate": recipe.creationDate,
          "categories": [
              {
                  "name": "test",
                  "description": "test"
              }
          ],
          "ingredients": [
              {
                  "name": "test",
                  "description": "test"
              }
          ],
          "author":"TomatoLover69",
        })
        }).then((response) => {
            if(response.status === 200){
                setAction("Changed");
                window.location.reload(false);
            }else{
                setAction("something went wrong. Error: ", response.status)
            }
          
        }).catch(function(error){
          setAction(`${error}`);
          console.log('ERROR:', error)
        })
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

            

                <button onClick={CheckContent}> Add recipe</button>
                <p>{action}</p>
            </div>
            <div>
                <RecipePage/>
            
            </div>
        </div>
        
    </div>
  )
}

export default EditRecipe