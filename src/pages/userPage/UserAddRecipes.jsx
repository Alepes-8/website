import './userAddRecipes.css';
import React, {useState,useEffect} from 'react';
import { async } from 'q';
import slugify from 'react-slugify';

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
    const [action, setAction] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [portionSize, setPortionSize] = useState();
    const [creationDate, setCreationDate] = useState();
    const [categories, setCategories] = useState("");
    const [ingredients, setIngredients] = useState("");

    
    useEffect(() => {
      let newDate = new Date()
      let today = `${ newDate.getFullYear()}-${newDate.getMonth()+1}-${ newDate.getDate()}`
      setCreationDate(today)
    }, []);
  
    const AddRecipesInfo = async() => {
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

      
      fetch('recipes/', {
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify({"name": name,
          "slug": newName,
          "description": description ,
          "portionSize": portionSize,
          "creationDate": creationDate,
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
        if(response.status === 201){
          setAction("Success");
          window.location.reload(false);
        }else{
          setAction("something went wrong, try again");
        }
         
      }).catch(function(error){
        setAction(`${error}`);
        console.log('ERROR:', error)
      })
    }

    const CheckContent = () => {
      setAction("checking value");
      if(name ===""){
        setAction("Missing a recipe name");
        return;
      }
      if(description ===""){
        setAction("Missing a description");
        return;
      }
      if(!portionSize){
        setAction("Missing a portionSize, or is a letter");
        return;
      }
      AddRecipesInfo();
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
              onChange={(e) => setName(e.target.value) }
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

          <button onClick={CheckContent}> Add recipe</button>
          <p>{action}</p>
    </div>

    );
};



export default UserAddRecipes;