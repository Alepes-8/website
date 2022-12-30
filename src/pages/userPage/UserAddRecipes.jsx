import './userAddRecipes.css';
import React, {useState,useEffect} from 'react';
import useToken from '../../useToken';
import axios from 'axios';

const validFileTypes = ["image/jpg", "image/jpeg"]

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

    const [auth, setAuth] = useState();

    const [imageFile, setImageFile] = useState();
    const [formTest, setFormTest] = useState();
    
    const [data, setData] = useState({
      image_url: "",
    });

    const handleImageChange = (e) => {
      let newData = { ...data };
      newData["image_url"] = e.target.files[0];
      setData(newData);
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
      }
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
      console.log(data.image_url)
      
      const userData = {
        "name": name,
        "description": description,
        "portionSize": portionSize,
        "creationDate": creationDate,
        "categories": [],
        "ingredients": [],
        "author": null,
        "picture":  data.image_url,
      };
      console.log(userData);
/*
      const headers = {
        "Content-Type": "multipart/form-data",
      }

      const res = await axios.post(`/recipes/`, userData, {headers})
      console.log(res);
  */ 
/**console.log(imageFile)
      let form_data = new FormData();
      form_data.append("name", name);
      form_data.append("description", description);
      form_data.append("portionSize", portionSize);
      form_data.append("creationDate", creationDate);
      form_data.append("categories", []);
      form_data.append("ingredients", []);
      form_data.append("author", null);
      form_data.append("picture", null);
      console.log(form_data)

      const headers = {
        "Content-Type": "multipart/form-data",
      }

      const res = await axios.post(`/recipes/`, form_data, {headers})
      console.log(res); */
     /* 
      const userData = {
        username: "admin@admin.com",
        password: "admin"
      };
      axios.post("/api-user-login/", userData, )
      .then(response => {
       console.log(response.data.token)
       setAuth(response.data.token);
      })
      
      const config = {
        headers: { Authorization: `Bearer ${auth}` }
    };
    
      axios.post( 
        '/users/',
        config
      ).then(console.log).catch(console.log);

*/
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
      
      const userData = {
        "name": name,
        "description": description,
        "portionSize": portionSize,
        "creationDate": creationDate,
        "categories": [],
        "ingredients": [],
        "author": null,
        "picture":  data.image_url,
      };

      const headers = {
        "Content-Type": "multipart/form-data",
      }

      const res = await axios.post(`/recipes/`, userData, {headers})
      console.log(res);
     */
      
      /*
      
      await RemoveMatchingItems(ingredients, ingData).map((item) => {
        let index = ingredients.indexOf(item);
        fetch("/ingredients/", {
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(   {
          "name": item,
          "description": ingredientsDesc[index] 
        })})        
      })

      await RemoveMatchingItems(categories, catData).filter((item) => {
        let index = categories.indexOf(item);        
        fetch("/categories/", {
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(   {
          "name": item,
          "description": categories[index] 
        })})        
      })
      CreateIngredients();

      setAction("success");
    */
      // ingAmount[index]

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

            <input type="file" 
              name="image_url"
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => {handleImageChange(e)}}/>

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