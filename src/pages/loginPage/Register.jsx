import React, {useState} from 'react'
import './authentication.css';


const Register = (props) => {
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info, temp database
    const database = [
      {
        username: "user1",
        password: "pass1"
      },
      {
        username: "user2",
        password: "pass2"
      }
    ];


    const errors = {
      email: "invalid username",
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
        }
        } else {
        // Username not found
        setErrorMessages({ name: "email", message: errors.email });
        }
    };

    //if there is no message within the parts  
    const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

    return (
        <div className='register_page'>
            <div className='auth_form_container'>
                <div className='auth_form_style'>
                <form className='login_form' onSubmit = {handleSubmit}>
                    <label htmlFor="uname">Full Name</label>
                    <input  type="text" name="uname"placeholder='Tom handcock' required />
                    {renderErrorMessage("uname")}

                    <label htmlFor="email">Email</label>
                    <input  type="text" name="email"placeholder='Exemeple@gmail.com' required />
                    {renderErrorMessage("email")}

                    <label htmlFor="password">Password</label>
                    <input type="password"  name="pass" placeholder='*********' required/>
                    {renderErrorMessage("pass")}
                    <button type="submit">Login </button>
                </form>
                <a href="/LoginPage" classname ='link_button'>You have an account? Log in</a>
            </div>
            </div>
        </div>
    );
  }
  

export default Register;