import React, {useState} from 'react'
import './authentication.css';


const LoginPage = ({token, setToken}) => {
    const [errorMessages, setErrorMessages] = useState({});

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    // User Login info, temp database

    const handleLogin = async() => {
        
      //future implementation when the server works as it should
      
      let response = await fetch("/users/")
      let data = await response.json()
      console.log(data);
      let user = data.filter((element) => {if(element.email === userEmail){
        return element;
      }})
      console.log(user);
      console.log(user);

      if(user.length !== 1){
        setErrorMessages("email not found");
        return;
      }
      console.log(user[0], password)

      if(user[0].password !== password){
        setErrorMessages("incorrect password");
        return;
      }
      let userData = { 
        email: userEmail,
        password: password, 
        admin: user[0].is_staff,
        supAdmin:user[0].is_superuser
      };
      setToken(userData);
      return;
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
          </div>
        </div>
      </div>
    );
  }
  

export default LoginPage;