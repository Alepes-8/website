
import './App.css';
import RecipeList from './RecipeList';
import {NavBar, Brand, CTA} from './components';
import {Blog, FeaturedFrontPage, Possibility,Header,Footer,Categories} from './containers';

function App() {
  return (
    <div className="App">
      <div className='gradient_bg'>
        <NavBar>

        </NavBar>
      </div>
      <Brand />

      <Blog/>
      

      <FeaturedFrontPage />
      <div className=''>
        <Categories>

        </Categories>
      </div>
      <Possibility />
      <CTA> 
      </CTA>
      

      <div className='footer_bg'>
        <Footer/>
      </div>
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
