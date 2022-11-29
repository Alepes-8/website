import React from 'react';
import './search.css';

const search = () => {
  return (
    <div className='search_page'>
      <div className='search_part'>
        <div className='search_page_search'>
          <div className='search_text_box '>
            <p> search box </p>
          </div>
          <div className='search_catagories'>
            <p> catagories </p>
          </div>
          <div className='search_submit '>
            <p> search Submit </p>
          </div>
          <div className='results_sorting'>
            <p> sorting</p>
          </div>
        </div>
        <div className='search_page_result'>
          
          <div className='results_seaction'>
            <p> results</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default search