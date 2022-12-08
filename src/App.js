
import './App.css';
import React from 'react'
import {Routes, Route} from 'react-router-dom';

//import RecipeList from './RecipeList';
import {NavBar} from './components';
import {Footer} from './containers';
import { StartPage, RecipePage, SearchPage, UsersRecipePage, UserPage} from './pages';
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
        
        <Route path="/RecipePage" element={<RecipePage/>}/>
          
        <Route path="/SearchPage" element={<SearchPage/>}/> 

        <Route path="/LoginPage" element={<UserPage token={token} setToken = {setToken} page={1}/>}/>

        <Route path="/Register" element={<UserPage token={token} setToken = {setToken} page={2}/>}/>

        <Route path="/UsersRecipePage" element={<UsersRecipePage/>}/>

      </Routes>

      
      
      {/*<Brand />
      <Features />
      <Possibility />
      <CTA/> 
      <Blog/>*/}

      <div className='footer_bg'>
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
