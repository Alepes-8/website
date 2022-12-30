import React, {useState} from 'react'
import './authentication.css';

const Register = ({setToken}) => {
    const [errorMessages, setErrorMessages] = useState("");

    const [regUserEmail, setRegUserEmail] = useState("");
    const [regPassword, setRegPassword] = useState("");
    const [controlPass, setControlPass] = useState("");

    const handleRegister = async() => {
      setErrorMessages("creating")
      //check the validation of an email input
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ( !re.test(regUserEmail) ) {
        setErrorMessages("email is bad")
        return;
      }

      if(regPassword !== controlPass){
        setErrorMessages("password does not match")
        return;
      }
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
          "email": regUserEmail,
          "password": regPassword,
          "groups": [],
          "savedRecipes": [],
          "createdRecipes": []
      })
      }).then((response) => {
        console.log(response)
        if(response.status === 201){
          let userData = { 
            email: regUserEmail,
            password: regPassword, 
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