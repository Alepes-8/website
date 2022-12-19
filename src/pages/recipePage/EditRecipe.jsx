import React, { useState, useEffect } from "react";
import './editRecipe.css';
import { useParams } from 'react-router-dom';
import temp from '../../assets/testporkleg.png';
import RecipePage from "./RecipePage";


const EditRecipe = () => {
    let {id} = useParams();
    let recipeId = id;
    let [recipes, setRecipe] = useState(null);

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

    const getRecipe = async() => {
        let response = await fetch(`/recipes/${recipeId}/`);
        let data = await response.json();
        //console.log('DATA: ', data);
        setRecipe(data);
    }

  return (
    <div className='EditRecipePage'>
        <div className="Editcontent">
            <div className="UserSavedRecipes">
                <h1>Edit Recipes</h1>
                
                <div className="form-group">
                    <p>NewName</p>
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter portionSize"
                    name="portionSize"
                    value={portionSize}
                    onChange={(e) => setPortionSize(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="date"
                    className="form-control form-control-lg"
                    placeholder="Enter creationDate"
                    name="creationDate"
                    value={creationDate}
                    onChange={(e) => setCreationDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter categories"
                    name="categories"
                    value={categories}
                    onChange={(e) => setCategories(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter ingredients"
                    name="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    />
                </div>

                <button>Edit Recipe</button>
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