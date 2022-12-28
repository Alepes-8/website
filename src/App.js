
import './App.css';
import React from 'react'
import {Routes, Route} from 'react-router-dom';

//import RecipeList from './RecipeList';
import {NavBar} from './components';
import {Footer} from './containers';
import { StartPage, RecipePage, UsersRecipePage, UserPage, AdminPage, EditRecipe} from './pages';
import useToken from './useToken';

function App() {
  const {token, setToken } = useToken();
  
  return (
    <div className="App">
      <div className='gradient_bg'>
      {token
        ? <NavBar loginStatus={true}/>  : <NavBar loginStatus={false} />
      }
      </div> 

      <Routes>
        <Route path="/" element={<StartPage/>}/>
        
        <Route path="/recipes/:id" element={<RecipePage/>}/>
          
        <Route path="/EditRecipe/:id" element={<EditRecipe/>}/>

        <Route path="/LoginPage" element={<UserPage token={token} setToken = {setToken} page={1}/>}/>

        <Route path="/Register" element={<UserPage token={token} setToken = {setToken} page={2}/>}/>

        <Route path="/AdminPage" element={<AdminPage/>}/> 

        <Route path="/UsersRecipePage" element={<UsersRecipePage/>}/>
      </Routes>

      <div className='footer_bg'>
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
