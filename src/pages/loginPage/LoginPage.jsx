import React, {useState} from 'react'
import './authentication.css';


const LoginPage = ({token, setToken}) => {
    const [errorMessages, setErrorMessages] = useState({});

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
      email: "invalid email",
      pass: "invalid password"
    };

    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


    const handleLogin = async() => {
    
      //future implementation when the server works as it should
      /* 
      fetch(`/users/${userEmail}`) //(need testing of the address. May just return the whole user list)
      .then((response) => {
        if(response.status == 404){
          setErrorMessages({ name: "email", message: "email does not exist" });
          return;
        }
        let data =  response.json()
        if(data.password !== password){
          setErrorMessages({ name: "pass", message: "incorect password" });
        }else{
          let userData = { 
            username: userName,
            password: password, 
            admin: false,
            supAdmin:false
          };
          setToken(userData);
        }
      })
      */
      


     // Find user login info
     const userData = database.find((user) => user.username === userEmail);

     // Compare user info
     if (userData) {
       if (userData.password !== password) {
         // Invalid password
         setErrorMessages({ name: "pass", message: errors.pass });
       } else {
         setToken(userData);
       }
     } else {
       // Username not found
       setErrorMessages({ name: "email", message: errors.email });
     }
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