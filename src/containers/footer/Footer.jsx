import React from 'react';
import './footer.css';
import world from '../../assets/world.png';



const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_settings'>
        <p><img src={world} alt="logo"/>Language</p>
        
      </div>
        
      <div className='footer_links'>
        <a href='#link'>Prevoius versions</a>
        <a href='#link'>Blog</a>
        <a href='#link'>Contribute</a>
        <a href='#link'>Privacy</a>
        <a href='#link'>Terms of Use</a>
        <a href='#link'>Trademark</a>
      </div>
      <div className='footer_tradeMark'>
        <p>This is a project created for a course at Luleå university of Technology with the course code M7011E </p>
      </div>
    </div>
  )
}

export default Footer