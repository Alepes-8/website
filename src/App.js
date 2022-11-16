import logo from './FoodFrontPage.png';
import './App.css';
import RecipeList from './RecipeList';
import {NavBar, Brand, CTA} from './components';
import {Blog, Features, Possibility,Header,Footer,WhatGPT3} from './containers';

function App() {
  return (
    <div className="App">
      <div className='gradient_bg'>
        <NavBar>

        </NavBar>
      </div>
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA> 
      </CTA>
      <Blog/>
      <Footer/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Future recipe front page
         
        </p>
        <RecipeList/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
