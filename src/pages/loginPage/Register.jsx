import React, {useState} from 'react'
import './authentication.css';

const Register = ({setToken}) => {
    const [errorMessages, setErrorMessages] = useState("");

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async() => {
  
      
      //alt 1 for the solution
      //Here we try to create it and if the server say no then either username or 
      //email is already in use. Then just give a not clear answer.
      fetch('/users/', {
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(   {
          "is_superuser": false,
          "is_staff": false,
          "email": userEmail,
          "password": password,
          "groups": [],
          "savedRecipes": [],
          "createdRecipes": []
      })
      }).then((response) => {
        console.log(response)
        if(response.status === 201){
          let userData = { 
            email: userEmail,
            password: password, 
            admin: false,
            supAdmin:false
          };
          setToken(userData);
        }else if(response.status === 200){
          setErrorMessages("email already in use");
          return;
        }
        else if(response.status == 500){
          setErrorMessages("server issues, error message 500");
          return;
        }
        else{
          setErrorMessages("something went wrong, try again");
          return;
        }
      }).catch(function(error){
        setErrorMessages(`${error}`);
        console.log('ERROR:', error)
        return;
      })
          }
    


    return (
      <div className='baseBackground'>
        <div className='auth_form_container'>
          <h1>Register </h1>
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
                <button onClick={(e) => handleRegister()}>Login </button>
                
                <a href="/LoginPage" className ='link_button'>You have an account? Log in</a>
            </div>
          </div>
        </div>
    );
  }
  

export default Register;