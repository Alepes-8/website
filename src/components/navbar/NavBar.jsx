import React, {useState} from 'react'
import './navbar.css';
import logo from '../../assets/swedishChef.gif';
import {RiMenu3Line, RiCloseLine} from 'react-icons/ri';
import  '../../useToken';
import { Link } from 'react-router-dom';

function deleteToken() {
  localStorage.removeItem('token')
}

function refreshPage(){
  window.location.reload(false);
}

const Menu = ({loginStatus}) =>(
  <>
    <p> <a href="/"> Home</a></p>
    <p> <Link to="/ContactUsPage" > Contact Us </Link></p>
    <p> <Link to="/LiveChatPage" > Live chat </Link></p>
    
    <div className="LogOutShow">
    {loginStatus
        ? <p><button className='logout' onClick={function(){ deleteToken(); refreshPage();}}> Logout</button></p> : <p></p>
      }
    </div>
  </>
)

const LoginState = ({loginStatus}) =>(
  <>
    <p>
      {loginStatus
        ? <a href="/LoginPage">User</a>
        : <a href="/LoginPage">Login</a>
      }
    </p>
  </>
)

const Loggout = () => {}

const NavBar = ({loginStatus}) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <Link to="/">
            <img src={logo} alt="logo" />

          </Link>
        </div>

      </div>
      <div className="gpt3__navbar-sign">
        <LoginState loginStatus={loginStatus}/>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <Menu loginStatus={loginStatus} />
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <LoginState loginStatus={loginStatus}/>
            {loginStatus
              ? <p><button className='logout' onClick={<Loggout/>}> Logout</button></p> : <p></p>
            }
          </div>
          
        </div>
        )}
      </div>
    </div>
  );
};

export default NavBar