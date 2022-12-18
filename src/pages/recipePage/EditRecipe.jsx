import React, { useState } from "react";
import './editRecipe.css';
import RecipePage from "./RecipePage";



const EditRecipe = () => {
    const [action, setAction] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [portionSize, setPortionSize] = useState();
    const [creationDate, setCreationDate] = useState();
    const [categories, setCategories] = useState("");
    const [ingredients, setIngredients] = useState("");


  return (
    <div className='EditRecipePage'>
    <div className="content">
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
       
        
    </div>
    </div>
  )
}

export default EditRecipe