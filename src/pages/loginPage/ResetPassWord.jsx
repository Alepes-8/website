import React, {useState} from 'react'
import './authentication.css';
import axios from 'axios';

function InputTemplate (inType, inHolder, inName, inValue, inSet) {
  return (
    <div className="form-group">
      <input
        type = {inType}
        className="form-control form-control-lg"
        placeholder={inHolder}
        name={inName}
        value={inValue}
        onChange={(e) => inSet(e.target.value) }
      />
    </div>
    
  );
}

const ResetPassWord = () => {
    const [status, setStatus] = useState("");
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");

    const [athenticated, setAthenticated] = useState(false)


    const handleEmailCheck = async() => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if ( !re.test(email) ) {
        setStatus("Bad Email")
        return;
      }
     console.log();
     setAthenticated(true); 
    }

    const setNewPassword = async() => {
      //does the email exist
      if(pass1 !== pass2){
        setStatus("The Passwords Does Not Match")
        return;
      }
      
      
      axios.defaults.headers.common = {Accept:`application/json`}
      axios.interceptors.request.use(
        config => {
            const token = "c861931e674bb10b1989374269af8fd661584218";

                config.headers['Authorization'] =  `Token ${token}`;
            
            config.headers['Content-Type'] = 'application/json';
            return config;
        },
        error => {
            Promise.reject(error)
      });
      

      axios.get('http://127.0.0.1:8000/users/').then(res =>  {
        
        console.log("res", res)
        const userData = res.data.filter((item) => {
          if(item.email === email){
            return item;
          }
        })
        console.log("userData", userData)

        const change ={
          "email": email,
          "password": pass1,
        };
        console.log("change", change)

        axios.put(`http://127.0.0.1:8000/users/${userData[0].id}/`,change ).then(resp => {
          console.log("resonse",resp)
          setStatus("changed password")

        })
      })

    }

    return (
      <div className='baseBackground'>
        <div className='auth_form_container'>
          <h1>ResetPassword </h1>
          {!athenticated
            ?
            <div className='auth_form_style'>
              <label htmlFor="email">Email</label>
              {InputTemplate ("text", "Exemple@gmail.com", "regEmail", email, setEmail)}
              <button onClick={(e) => handleEmailCheck()}> Reset Password </button>
              <a href="/LoginPage" className ='link_button'>Log in</a>
              <a href="/Register" className ='link_button'>Don't have an account? Register</a>
              {status}
            </div>
            :
            <div className='auth_form_style'>
              <label htmlFor="email">New PassWord</label>
              {InputTemplate ("password", "***********", "passwordnew", pass1, setPass1)}
              <label htmlFor="email">Repeat Password</label>
              {InputTemplate ("password", "***********", "regEmailrep", pass2, setPass2)}
              <button onClick={(e) => setNewPassword()}>Reset Password </button>
              {status}
              <a href="/LoginPage" className ='link_button'>Log in</a>
              <a href="/Register" className ='link_button'>Don't have an account? Register</a>
            </div>
            }
          
          </div>
        </div>
    );
  }
  

export default ResetPassWord;