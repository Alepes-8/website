import React, {useState} from 'react'
import './authentication.css';


const LoginPage = ({token, setToken}) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

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


    /* here we submit the and handle the values which has been inputed.
      In turn this will be where we probably contact the database*/
    const handleSubmit = (event) => {
      //Prevent page reload
      event.preventDefault();

      var { email, pass } = document.forms[0];

      // Find user login info
      const userData = database.find((user) => user.username === email.value);

      // Compare user info
      if (userData) {
        if (userData.password !== pass.value) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsSubmitted(true);
          setToken(userData);
        }
      } else {
        // Username not found
        setErrorMessages({ name: "email", message: errors.email });
      }
    };


    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );


    

    return (
      <div className='baseBackground'>
        <div className='auth_form_container'>
          <div className='auth_form_style'>
            <form className='login_form' onSubmit = {handleSubmit}>
                  <label htmlFor="email">Email</label>
                  <input  type="text" name="email"placeholder='Exemeple@gmail.com' required />
                  {renderErrorMessage("email")}
                  <label htmlFor="password">Password</label>
                  <input type="password"  name="pass" placeholder='*********' required/>
                  {renderErrorMessage("pass")}
                  <button type="submit">Login </button>
            </form>
            <a href="/Register" className ='link_button'>Don't have an account? Register</a>
          </div>
        </div>
      </div>
    );
  }
  

export default LoginPage;