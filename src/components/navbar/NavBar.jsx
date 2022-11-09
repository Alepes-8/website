import React, {useState} from 'react'
import './navbar.css';
import logo from '../../assets/logo.png';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';


/*import {RiMenu3Line, RiCloseLin} from 'react-icons/ri';*/
const Menu = () =>(
  <>
    <p> <a href="#home"> Home</a></p>
    <p> <a href="#home"> Recipes</a></p>
    <p> <a href="#home"> Search</a></p>
  </>
)



const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={logo} alt="logo"/>
        </div>

      </div>
      <div className="gpt3__navbar-sign">
        <p>Login</p>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <Menu />
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <p>Login</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default NavBar