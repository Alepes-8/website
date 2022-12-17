import './userAddRecipes.css';
import React, {useState} from 'react';
/*{
    "name": "",
    "slug": "",
    "description": "",
    "portionSize": null,
    "creationDate": null,
    "categories": [],
    "ingredients": []
}*/

const UserAddRecipes = () => {
  
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [portionSize, setPortionSize] = useState();
    const [creationDate, setCreationDate] = useState();
    const [categories, setCategories] = useState("");
    const [ingredients, setIngredients] = useState("");


    const AddRecipesInfo = async () => {

        fetch('recipes/', {
          method:'POST',
          headers:{
            'Content-type':'application/json',
          },
          body:JSON.stringify({"name": "test",
            "slug": "test3",
            "description": "test",
            "portionSize": 4,
            "creationDate": "2022-12-15",
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
          console.log(response)
        }).catch(function(error){
          console.log('ERROR:', error)
        })
  

    }

    return (
    <div className="UserSavedRecipes">
        <h1>AddRecipes</h1>
        <div className="form-group">
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

          <button onClick={AddRecipesInfo}> Add recipe</button>
    </div>

    );
};



export default UserAddRecipes;