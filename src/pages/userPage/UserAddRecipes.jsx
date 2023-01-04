import './userAddRecipes.css';
import React, {useState,useEffect} from 'react';
import useToken from '../../useToken';
import axios from 'axios';
import slugify from 'react-slugify';

const validFileTypes = ["image/jpg", "image/jpeg"]
function timeout(number) {
  return new Promise( res => setTimeout(res, number) );
}

const UserAddRecipes = ({catData, ingData}) => {
    const {token, setToken } = useToken();

    const [action, setAction] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [portionSize, setPortionSize] = useState();
    const [creationDate, setCreationDate] = useState();



    const [categories, setCategories] = useState([]);
    const [catagorieDescs, setCategoriesDescs] = useState([]);
    const [catSearchTerm, setCatSearchTerm] = useState('');
    const [catSearchDesc, setCatSearchDesc] = useState('');

    const [ingredients, setIngredients] = useState([]);
    const [ingredientsDesc, setIngredientsDesc] = useState([]);
    const [ingAmount, setIngAmount] = useState([]);
    const [ingSearchTerm, setIngSearchTerm] = useState('');
    const [ingSearchDesc, setIngSearchDesc] = useState('');
    const [ingSearchAmount, setIngSearchAmount] = useState('');
    
    const [cImage, setCImage] = useState();


    const handleImageChange = (e) => {
      setCImage(e.target.files[0]);
    };

    useEffect(() => {
      let newDate = new Date()
      let today = `${ newDate.getFullYear()}-${newDate.getMonth()+1}-${ newDate.getDate()}`
      setCreationDate(today)
    }, [])

 

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
      }/*
      if(!validFileTypes.find(type => type === data.image_url.type)){
        setAction("Missing a image, or wrong format. jpg/jpeg");
        return;
      }*/
      CreateRecipe();
    }



    //TODO Creating the recipe is not a problem. But todo is to create the 
    // ingredient
    // ingredient amount
    // slug
    // catagories
    // catagory amount
    //5274179a8e21a1fbdc36c1061bd2968a623cfc8d
    const CreateRecipe = async() => {
      setAction("creating recipe");

      let newName =slugify(name)
      let acceptingSlug = false;
      console.log(newName);
      do{
        let response = await fetch(`/recipeSlugs/${newName}`)
        if(response.status === 404){
          acceptingSlug = true;
        }
        else if(response.status === 200){
          let extra = Math.random().toString(36).substring(2,2+2);
          newName = newName + extra;
        }
      }while(!acceptingSlug);
      
      const userData = {
        "name": name,
        "description": description,
        "portionSize": 1,
        "creationDate": creationDate,
        "categories": [],
        "ingredients": [],
        "author": "None",
        "picture": null //TODO. a problem where the image does not want to be saved
      };
      const headers = {
        'Content-type':'application/json',
        "Content-Type": "multipart/form-data",
      }    
      console.log(userData)

      //create the recipe
      const finalData = {"recipe": userData, "slug":newName};
      const res = await axios.post(`/recipeSlugs/`, finalData, {headers})
      console.log(res);
      if(res.status !== 201){
        alert("may need to change name or the website may be down for adding recipes")
      }

      const imagedata = {
        "name": name,
        "description": description,
        "portionSize": 1,
        "picture": cImage //TODO. a problem where the image does not want to be saved
      };
      setAction("add image");
      axios.put(`/recipes/${res.data.recipe.id}/`,imagedata,headers).then(res => {
        console.log(res);
      })
      
      setAction("creating ingredients");
      //create new ingredients
      await RemoveMatchingItems(ingredients, ingData).map((item) => { 
        let index = ingredients.indexOf(item);
        const createdIngredient = {
          "name": item,
          "description": ingredientsDesc[index] 
        };
        axios.post(`/ingredients/`, createdIngredient, {headers}).then((response)=>
          console.log(response)
        )
      })
      
      await timeout(1000);
      let fullIngredientList;
      let notBreak = false;
      let value = 0
      do{
        const response = await axios.get(`/ingredients/`)
        
        fullIngredientList = response.data.filter(element => {
          return ingredients.find(item => item === element.name);
        })
      
        value +=1;
        console.log( value)
        if(value > 7){
          break;
        }else if(fullIngredientList.length !== ingredients.length ){
          notBreak = true;
        }
      }while(notBreak);
      
     
      //get current id of ingredients
      
      setAction("add amounts");
      //create the ingrdient connections
      ingredients.map((item, index) => {
        const createConnectionData = fullIngredientList.filter(element => element.name === item)
        if(createConnectionData && createConnectionData.length === 1){
          const ingConnectionData = {
            "pk": null, // does not matter due to it being auto generated
            "recipe": res.data.recipe.id,
            "ingredient": createConnectionData[0].id,
            "amount": ingAmount[index]
          };
          console.log("ingConnectionData", ingConnectionData)
          axios.post(`/ingredients-amount/`, ingConnectionData, {headers}).then((response)=>
          console.log(response)
          )
        }
      })
      setAction("sucess");

      //_______________________________________________________________________________
    }
 
    function AddItems(term, desc, group, groupDesc, set, setDesc, extra, groupExtra, setExtra){
      if(term===""){
        return;
      }
      if(desc === ""){
        desc = "N/A";
      }
      let found = group.filter((val) => {if(val==term){
        return val;
      }})
      if(found == 0 ){
        set([...group, term]);
        setDesc([...groupDesc, desc]);
        if(setExtra === setIngAmount){
          if(extra === ""){
            extra = "N/A";
          }
          setExtra([...groupExtra,extra])
        }
      }
    }

    const ListItems = ({data, word, group, groupDesc, set, setDesc, extra, groupExtra, setExtra}) =>{
      if(!data){
        return;
      }
      return(

        data.filter((val) => 
          {
            if(word===""){
              return val
            }else if(val.name.toLowerCase().includes(word.toLowerCase())){
              return val
            }
          }).map((item, index) => {if(index <= 9){           
                  return(
                    <div className='Cat_Ing_Align_CSS'  >
                      <button onClick={(e) => {
                        AddItems(item.name, item.description, group, groupDesc, set, setDesc, extra, groupExtra, setExtra); 
                        }} title={item.description}>
                        {item.name}
                        
                      </button>
                    </div>
                  );
                }else if(index == 10){
                  return(<div><p>...</p></div>);
                }
              })

      );
      
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

    function DeleteItemByIndex(index, list){
      list(prev => 
        prev.filter((dec, descIndex) => descIndex !== index
      ));
    }

    return (
    <div className="UserSavedRecipes">
        
        <div className='recipe_Inputs'>
          
          
          <div>
            <button onClick={(e) => AddItems(ingSearchTerm, ingSearchDesc, ingredients, ingredientsDesc, setIngredients, setIngredientsDesc, ingSearchAmount, ingAmount, setIngAmount)}> Add Ingredints</button>

            {ingredients.map((item, index) => {
              return(
                <div className='Cat_Ing_Align_CSS'> <p> 
                  {/* Ingredient button. 
                      SetCatagorie is the to delete info from categories and respective description
                      The title is there to show description of category */}
                  <button 
                    onClick={(e)=>
                      setIngredients((prev) => prev.filter((ing, itemIndex) => {
                        if(ing !== item ){
                          return ing;
                        }else{
                          DeleteItemByIndex(itemIndex, setIngredientsDesc);
                          DeleteItemByIndex(itemIndex, setIngAmount);
                        }
                      }))
                    } 
                    
                    title={ingredientsDesc[index]}>{item} {ingAmount[index]}
                  </button> </p>
                </div>
              )})}

          </div>

          <div>
              {InputTemplate("text" ,"Enter ingredient","ingredient",ingSearchTerm,setIngSearchTerm)}
              {InputTemplate("text" ,"Enter description","ingdescription",ingSearchDesc,setIngSearchDesc)}
              {InputTemplate("text" ,"Enter amount","ingredientAmount",ingSearchAmount,setIngSearchAmount)}

              <ListItems data={ingData} word ={ingSearchTerm} group={ingredients} groupDesc={ingredientsDesc} 
                        set={setIngredients} setDesc={setIngredientsDesc} extra={ingSearchAmount} groupExtra={ingAmount} 
                        setExtra={setIngAmount}/>
            </div>

          <div>
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

            {InputTemplate("text" ,"Enter Your Name","name",name,setName)}
            {InputTemplate("text" ,"Enter description","description",description,setDescription)}
            {InputTemplate("number" ,"Enter portionSize","portionSize",portionSize,setPortionSize)}
            

            <button onClick={CheckContent}> Add recipe</button>
            <p>{action}</p>
          </div>
          <div>
            <div>
              {InputTemplate("text" ,"Enter Categorie","categories",catSearchTerm,setCatSearchTerm)}
              {InputTemplate("text" ,"Enter description","categories",catSearchDesc,setCatSearchDesc)}
            </div>  
            <ListItems data={catData} word ={catSearchTerm} group={categories} groupDesc ={catagorieDescs} set={setCategories} setDesc={setCategoriesDescs}/>
          </div>

          <div>
            <button onClick={(e) => AddItems(catSearchTerm, catSearchDesc, categories, catagorieDescs, setCategories, setCategoriesDescs)}> Add categories</button>
            {categories.map((item, index) => {
              return(
                <div className='Cat_Ing_Align_CSS'> <p> 
                  {/* Ingredient button. 
                      SetCatagorie is the to delete info from categories and respective description
                      The title is there to show description of category */}
                  <button 
                    onClick={(e)=>
                      setCategories((prev) => prev.filter((cat, itemIndex) => {
                        if(cat !== item ){
                          return cat;
                        }else{
                          DeleteItemByIndex(itemIndex, setCategoriesDescs);
                        }
                      }))
                    } 
                    title={catagorieDescs[index]}>{item}
                  </button> </p>
                </div>
              )})}
          </div>

        </div>
        
          
        
    </div>

    );
};

//time complexity n^2 and can get better if we sort by letter perhaps
//take out the ingredeints which does not already exists
function RemoveMatchingItems(data1, data2){
  let create = data1.filter((val, index) => 
  {
    let rep = data2.filter((element)=> {
      if(element.name.toLowerCase() === val.toLowerCase()){
        return element
      }
    })
    if(rep.length == 0){
      return val;
    }
  })
  return(create);
}

export default UserAddRecipes;