import './searchPage.css';
import React from "react";
import {NavBar, Brand, CTA} from '../../components';
import {Blog, Features, Possibility,/*Header,*/Footer,Categories} from '../../containers';

const SearchPage = () => {
    return (
      <div className="SearchPage">
        
        <h1>
            You have reached the search page.
        </h1>

        <div className='categories'>
          <Categories/>
        </div>

      </div>
    );
  }
  
  export default SearchPage;