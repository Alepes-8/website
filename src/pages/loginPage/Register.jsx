import React, {useState} from 'react'
import './authentication.css';
import axios from 'axios';
const Register = ({setToken}) => {
    const [errorMessages, setErrorMessages] = useState("");

    const [regUserEmail, setRegUserEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [controlPass, setControlPass] = useState("");

    const handleRegister = async() => {
      //check the validation of an email input
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ( !re.test(regUserEmail) ) {
        setErrorMessages("email is bad")
        return;
      }

      if(regPassword !== controlPass || !regPassword || !controlPass){
        setErrorMessages("password does not match")
        return;
      }
      //alt 1 for the solution
      //Here we try to create it and if the server say no then either username or 
      //email is already in use. Then just give a not clear answer.
      
      const user = {
        "id": 1,
        "is_superuser": false,
        "is_staff": false,
        "email": regUserEmail,
        "password": regPassword,
        "savedRecipes": [],
        "createdRecipes": []
      }

     
      const header = {
        'Accept':`application/json`,
        'Content-Type': 'application/json'
      }
      
      axios.post('http://127.0.0.1:8000/users/', user, {header}).then(res => 
      {
        
        console.log(res)
        if(res.status ===404){
          setErrorMessages("email already existing")
        }else if(res.status === 500){
          setErrorMessages("Try Again later, server seems to not respond")
        }else if(res.status === 201){
          setErrorMessages("Success, acount created")
        }

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
                    name="regEmail"
                    value={regUserEmail}
                    onChange={(e) => {setRegUserEmail(e.target.value)}}
                  />
                </div>
               
                <div className="login_form">
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="**********"
                    name="regPass"
                    value={regPassword}
                    onChange={(e) => {setRegPassword(e.target.value)}}
                  />
                </div>

                <div className="login_form">
                  <label htmlFor="password">repeat password</label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="**********"
                    name="regControlPass"
                    value={controlPass}
                    onChange={(e) => {setControlPass(e.target.value)}}
                  />
                </div>
                <p>{errorMessages}</p>
                <button onClick={(e) => handleRegister()}>Login </button>
                
                <a href="/LoginPage" className ='link_button'>You have an account? Log in</a>
            </div>
          </div>
        </div>
    );
  }
  

export default Register;