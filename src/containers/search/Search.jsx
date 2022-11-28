import React from 'react';
import './search.css';

const search = () => {
  return (
    <div className='search_page'>
      <div className='search_page_search'>
        <div className='search_text_box '></div>
        <div className='search_catagories'></div>
      </div>
      <div className='search_page_result'>
        <div className='results_sorting'></div>
        <div className='results_seaction'></div>
      </div>
    </div>
  )
}

export default search