
import './App.css';
//import RecipeList from './RecipeList';
import {NavBar, Brand, CTA} from './components';
import {Blog, Features, Possibility,/*Header,*/Footer,Categories} from './containers';
import {Routes, Route} from 'react-router-dom';
import { StartPage, RecipePage, SearchPage } from './pages';

function App() {
  return (
    <div className="App">
      <div className='gradient_bg'>
        <NavBar/>
      </div>

      <Routes>
        <Route path="/" element={<StartPage/>}/>
        
        <Route path="/RecipePage" element={<RecipePage/>}/>
          
        <Route path="/SearchPage" element={<SearchPage/>}/> 
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
