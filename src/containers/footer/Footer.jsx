import React from 'react';
import './footer.css';



const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer_settings'></div>
          
        <p>Theme</p>
      <div className='footer_links'>
        <a href='#link'>Prevoius versions</a>
        <a href='#link'>Blog</a>
        <a href='#link'>Contribute</a>
        <a href='#link'>Privacy</a>
        <a href='#link'>Terms of Use</a>
        <a href='#link'>Trademark</a>
      </div>
      <div className='footer_tradeMark'></div>
    </div>
  )
}

export default Footer