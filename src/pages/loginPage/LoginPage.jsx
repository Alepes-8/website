import React, {useState} from 'react'
import './authentication.css';
import axios from 'axios';
axios.defaults.headers.common = {Accept:`application/json`}


axios.interceptors.request.use(
  config => {
      const token = "c861931e674bb10b1989374269af8fd661584218";
      if (token) {
          config.headers['Authorization'] =  `Token ${token}`;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
  },
  error => {
      Promise.reject(error)
});

const LoginPage = ({token, setToken}) => {

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    // User Login info, temp database

    const handleLogin = async() => {
      
      const dataTokenRequest = {
        username: "admin@admin.com",
        password: "admin",
      }
      const dataTokenRequest2 = {
        username: "tomatolover69@tomato.com",
        password: "tomatotomato",
      }
  
      const headerTokenRequest = {
        'Accept': 'application/json',
        'Content-type':'application/json',
      }
      const headerGetUsers = {
        Accept:`application/json`,
        Authorization: `Token c861931e674bb10b1989374269af8fd661584218`,
         
      }
      axios.get(`http://127.0.0.1:8000/users/`).then( respo =>
        console.log("users", respo)
      )

      axios.get(`http://127.0.0.1:8000/users/1/`).then( respo =>
        console.log("user1", respo)
      )
        

      //future implementation when the server works as it should
      /*
      let response = await fetch("/users/")
      let data = await response.json()
      console.log(data);
      let user = data.filter((element) => {if(element.email === userEmail){
        return element;
      }})
      console.log(user);
      console.log(user);

      if(user.length !== 1){
        return;
      }
      console.log(user[0], password)

      if(user[0].password !== password){
        return;
      }
      let userData = { 
        email: userEmail,
        password: password, 
        admin: user[0].is_staff,
        supAdmin:user[0].is_superuser
      };
      setToken(userData);
      return;*/
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