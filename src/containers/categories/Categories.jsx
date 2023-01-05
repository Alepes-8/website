import React, {useState} from 'react';
import './categories.css';




function clickMe(){
  alert('You clicked me');
}



const categories = ['meat','vegan', 'fish', 'greens','vegitarian','pig','hallal','middle east', 'apitizer', 'desert'];

function ButtonGroup(){
  const [hideButtons, setHideText] = useState(false);
  const [row, column] = useState(0);


  return (
  <div className='categories'>
    {categories.map((type) => (
      <button>
        {type}
      </button>
        
      ))}

  </div>
  )
}


const Categories = () => {
  return (
    <ButtonGroup/>
  )
}

export default Categories