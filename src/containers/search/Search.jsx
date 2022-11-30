import React from 'react';
import './search.css';
import {SearchResults} from '../../components';
import temp from '../../assets/temp.png';


class ResultingParts extends React.Component {
  render() {
    return (
      <div className='Search_Results'>
        <button>
        
            <div className='left'>
              <div className='Search_Results_Image'><img src={this.props.Image} alt="logo"/> </div>
            </div>
            
              <div className='Search_Results_Title'> {this.props.Title}  </div>
              <div className='Search_Results_Info'> {this.props.Desciption}</div>
            
        
        </button>
        
    </div>
    );
  }
}


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
            <ResultingParts Image={temp} Title="hejsan" Desciption="Test"/> 
            <ResultingParts Image={temp} Title="hejsan" Desciption="Test"/> 
            <ResultingParts Image={temp} Title="hejsan" Desciption="Test sssssssssss sddasdhkhslkd ashdlfhaslkjdhf lkahsdlfkj asiud"/> 


           
          </div>
        </div>
      </div>
    </div>
  )
}

export default search