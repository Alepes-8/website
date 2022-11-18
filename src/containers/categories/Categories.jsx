import React, {useState} from 'react';
import './categories.css';




function clickMe(){
  alert('You clicked me');
}



const categories = ['meat', 'fish', 'greens'];

function ButtonGroup(){
  
  return <div>
    {categories.map(type => (
      <button>
        {type}
      </button>
    ))}
  </div>
}


const Categories = () => {
  return (
    <ButtonGroup/>
  )
}

export default Categories