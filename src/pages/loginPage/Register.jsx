import React, {useState} from 'react'
import './authentication.css';

const Register = ({token, setToken}) => {
    const [errorMessages, setErrorMessages] = useState("");

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");


    // User Login info, temp database
    const database = [
      {
        username: "user1",
        password: "pass1", 
        admin: false,
        supAdmin:false
      },
      {
        username: "admin",
        password: "admin",
        admin: true,
        supAdmin:false
      },
      {
        username: "sup",
        password: "sup",
        admin: false,
        supAdmin:true
      }
    ];



    const errors = {
      email: "invalid username",
      pass: "invalid password"
    };

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
      


      /*
      //alt2 for register
      // here we check if username exist then check if the email exist if username is free.
      fetch(`/users/${userName}`).then((response) => {
        if(response.status !== 404){
          setErrorMessages("username is already in use")
          if(response.status === 500){
            setErrorMessages("server issues, error message 500");
          }
          return;
        }
      });

      fetch(`/users/${userEmail}`).then((response) => {
        if(response.status !== 404){
          setErrorMessages("email is already in use")
          if(response.status === 500){
            setErrorMessages("server issues, error message 500");
          }
          return;
        }
      });

      fetch('/users/', {
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify(   {
          "username": userName,
          "email": userEmail,
          "password": password ,
          
      })
      }).then((response) => {
        if(response.status === 500){
          setErrorMessages("Username and email are good, it's just server issues, error message 500");
        }
      });

       let userData = { 
        username: userName,
        password: password, 
        admin: false,
        supAdmin:false
      };
      setToken(userData);
      */

/*
     // Find user login info
     const userData = database.find((user) => user.username === userEmail);

     // Compare user info
     if (userData) {
       if (userData.password !== password) {
         // Invalid password
         setErrorMessages("Password Is incorect");
       } else {
         setToken(userData);
       }
     } else {
       // Username not found
       setErrorMessages("Email Is incorect");
      }
  */
    }
    


    return (
      <div className='baseBackground'>
        <div className='auth_form_container'>
          <h1>Register </h1>
          <div className='auth_form_style'>
                <div className="login_form">
                  <label htmlFor="email">UserName</label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="userName"
                    name="userName"
                    value={userName}
                    onChange={(e) => {setUserName(e.target.value)}}
                  />
                </div>
                
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
                {errorMessages}
                <button onClick={(e) => handleRegister()}>Login </button>
                
                <a href="/LoginPage" className ='link_button'>You have an account? Log in</a>
            </div>
          </div>
        </div>
    );
  }
  

export default Register;