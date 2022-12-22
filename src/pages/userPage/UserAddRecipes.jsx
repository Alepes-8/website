import './userAddRecipes.css';
import React, {useState,useEffect} from 'react';
import { async } from 'q';
import slugify from 'react-slugify';

const testCatDate =[
  {"name": "fish"},
  {"name": "cow"},
  {"name": "cheese"},
  {"name": "beer"},
  {"name": "deer"},
  {"name": "cat"},
  {"name": "apple"},
  {"name": "cider"},
  {"name": "bread"},
  {"name": "corn"},
  {"name": "milk"},
  {"name": "vegan"},
  {"name": "mold"},
  {"name": "finger"},
  {"name": "bear"},
  {"name": "god"},
];

const testIngDate =[
  {"name": "fish"},
  {"name": "cow"},
  {"name": "cheese"},
  {"name": "beer"},
  {"name": "deer"},
  {"name": "cat"},
  {"name": "apple"},
  {"name": "cider"},
  {"name": "bread"},
  {"name": "corn"},
  {"name": "milk"},
  {"name": "vegan"},
  {"name": "mold"},
  {"name": "finger"},
  {"name": "bear"},
  {"name": "god"},
];





const UserAddRecipes = () => {
    const [action, setAction] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [portionSize, setPortionSize] = useState();
    const [creationDate, setCreationDate] = useState();


    const [categories, setCategories] = useState([]);
    const [catagoriesData, setCatagoriesData] = useState("");

    const [ingredients, setIngredients] = useState([]);
    const [ingredientsData, setIngredientsData] = useState("");



    const [ingSearchTerm, setIngSearchTerm] = useState('');
    const [ingSearchsDesc, setIngredientsDesc] = useState('');

    const [catSearchTerm, setCatSearchTerm] = useState('');
    const [catSearchsDesc, setCategoriesDesc] = useState('');

    
    useEffect(() => {
      let newDate = new Date()
      let today = `${ newDate.getFullYear()}-${newDate.getMonth()+1}-${ newDate.getDate()}`
      setCreationDate(today)
      
      //getCatagorieData()

    }, [])
/*
    let getCatagorieData = async () => {
        let response = await fetch("/categories/")
        let data = await response.json()
        //console.log('DATA: ', data)
        setCatagoriesData(data)
    }
  */  
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

    const CreateRecipe = async() => {
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
        body:JSON.stringify(   {
          "name": name,
          "slug": newName,
          "description": description ,
          "portionSize": portionSize,
          "creationDate": creationDate,
          "categories": [],
          "ingredients": [],
          "author": "admin"
      })
      }).then((response) => {
        if(response.status === 201){
          
        }else{
          setAction("something went wrong, try again");
          return;
        }
      }).catch(function(error){
        setAction(`${error}`);
        console.log('ERROR:', error)
        return;
      })

      


      setAction("success");
    }

    const CreateIngredients =async()=>{
    
    }

    const CreateCategories =async()=>{

    }


 
    function AddItems(term, group, set){
      if(term==""){
        return;
      }
      let found = group.filter((val) => {if(val==term){
        return val;
      }})
      if(found == 0 ){
        set([...group, term]);
      }
    }

    const ListItems = ({data, word, group, set}) =>{
      return(

        data.filter((val) => 
          {
            if(word===""){
              return val
            }else if(val.name.toLowerCase().includes(word.toLowerCase())){
              return val
            }
          }).map((item, index) => {if(index <= 9){
                  return(<div className='Cat_Ing_Align_CSS'  ><button onClick={(e) => AddItems(item.name, group, set)}>{item.name}</button></div>);
                }else if(index == 10){
                  return(<div><p>...</p></div>);
                }
              })

      );
      
    }

    return (
    <div className="UserSavedRecipes">
        
        <div className='recipe_Inputs'>
          
          
          <div>
            <button onClick={(e) => AddItems(ingSearchTerm, ingredients, setIngredients)}> Add Ingredints</button>
            {ingredients.map((item, index) => {
              return(
                <div className='Cat_Ing_Align_CSS' > <p> <button onClick={(e)=>setIngredients(prev => prev.filter(fruit => fruit !== item ))}>{item}</button> </p></div>
              )})}
          </div>

          <div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter categories"
                  name="categories"
                  value={ingSearchTerm}
                  onChange={(e) => {setIngSearchTerm(e.target.value)}}
                />
              </div>
              <ListItems data={testIngDate} word ={ingSearchTerm} group={ingredients} set={setIngredients}/>
              
            </div>

          <div>
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

            <button onClick={CheckContent}> Add recipe</button>
            <p>{action}</p>
          </div>

          <div>
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter categories"
                name="categories"
                value={catSearchTerm}
                onChange={(e) => {setCatSearchTerm(e.target.value)}}
              />
            </div>
            <ListItems data={testCatDate} word ={catSearchTerm} group={categories} set={setCategories}/>
          </div>

          <div>
            <button onClick={(e) => AddItems(catSearchTerm, categories, setCategories)}> Add categories</button>
            {categories.map((item, index) => {
              return(
                <div className='Cat_Ing_Align_CSS' > <p> <button onClick={(e)=>setCategories(prev => prev.filter(fruit => fruit !== item ))}>{item}</button> </p></div>
              )})}
          </div>

        </div>
        
          
          
    </div>

    );
};



export default UserAddRecipes;