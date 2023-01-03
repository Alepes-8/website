import React, {useState} from 'react'
import './authentication.css';
import axios from 'axios';

const LoginPage = ({token, setToken}) => {

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    // User Login info, temp database

    const handleLogin = async() => {
        
      //future implementation when the server works as it should
      
      const dataUser = {
        username: userEmail,
        password: password,
      }
  
      const headerTokenRequest = {
        'Accept': 'application/json',
        'Content-type':'application/json',
      }

      await axios.post('http://127.0.0.1:8000/api-user-login/', dataUser,{headerTokenRequest}).then(res =>
      {

        console.log("response", res);
        if(res.status === 200){
          let userData = { 
            id: res.data.id,
            email: res.data.email,
            password: password, 
            admin: res.data.is_staff,
            supAdmin: res.data.is_superuser,
            token: res.data.token,
          };
          setToken(userData);
          return;
        }
        console.log(res)
      });
      
    }

    return (
      <div className='baseBackground'>
        <div className='auth_form_container'>
          <h1>Login</h1>
          <div className='auth_form_style'>

          <div className="login_form">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Exemple@gmail.com"
              name="email"
              value={userEmail}
              onChange={(e) => {setUserEmail(e.target.value)}}
            />
            </div>
            <div className="login_form">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                placeholder="**********"
                name="pass"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>
            <button onClick={(e) => handleLogin()}>Login </button>
            <a href="/Register" className ='link_button'>Don't have an account? Register</a>
            <a href="/ResetPassWord" className ='link_button'>Forgotten Password</a>
          </div>
        </div>
      </div>
    );
  }
  

export default LoginPage;