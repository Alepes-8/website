import React, {useState} from 'react'
import './authentication.css';
import axios from 'axios';
import { Checkbox } from '@material-ui/core';

const LoginPage = ({token, setToken}) => {

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shouldAthenticate, setShouldAthenticate] = useState(false);
    const [athenticate, setAthenticate] = useState(false);
    const [athCode, SetAthCode] = useState(0);
    const [inputAthenticateValue, setInputAthenticateValue] = useState(1)
    const [userData, setUserData] = useState();

    // User Login info, temp database
    function checkAthentication(){
      console.log(inputAthenticateValue, athCode)
      if(athCode.toString() !== inputAthenticateValue){
        alert("wrong code")
        SetAthCode(0);
        setInputAthenticateValue(1);
        setAthenticate(false)
        setUserData({})
        return
      }
      setToken(userData);
      return;
    }

    function sendMail(){



      const contactFormData=new FormData();
        contactFormData.append('full_name','conformation')
        contactFormData.append('email', 'oliolo.project1@gmail.com')
        contactFormData.append('query', athCode.toString())
      console.log( contactFormData)
      try{
          axios.post('http://127.0.0.1:8000/contact/', contactFormData).then(res => console.log("mail response", res))
      }catch(error){
          console.log(error);
          
      }
    }

    const handleLogin = async() => {
        
      //future implementation when the server works as it should
      
      const dataUser = {
        username: userEmail,
        password: password,
      }
  
      const headerTokenRequest = {
        'Accept': 'application/json',
        'Content-type':'application/json',
      }

      await axios.post('http://127.0.0.1:8000/api-user-login/', dataUser,{headerTokenRequest}).then(res =>
      {
        if(shouldAthenticate){
          var val = Math.floor(1000 + Math.random() * 9000);
          console.log(val);
          SetAthCode(val);
          setAthenticate(true);
          console.log(res)
          setUserData( { 
            id: res.data.id,
            email: res.data.email,
            password: password, 
            admin: res.data.is_staff,
            supAdmin: res.data.is_superuser,
            token: res.data.token,
          })
          console.log(userData);

          sendMail()
          alert("check mail to se athentication code")
        }else{
          const userResult= { 
            id: res.data.id,
            email: res.data.email,
            password: password, 
            admin: res.data.is_staff,
            supAdmin: res.data.is_superuser,
            token: res.data.token,
          };
          console.log(userResult)
          setToken(userResult);
        }
        
      });
      
    }

    return (
      <div className='baseBackground'>
       {!athenticate 
       ?  
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
          <div className='toggle_Box'>
                    <p><input type="checkbox" defaultChecked={shouldAthenticate} onClick={(e) => setShouldAthenticate(!shouldAthenticate)} /> Athenticate</p>         
          </div>
        </div>
      </div> 
     :
     <div className='auth_form_container'>
        <h1>Athenticate</h1>
        <div className='auth_form_style'>

        <div className="login_form">
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="Athenticated value"
            name="AtheCode"
            value={inputAthenticateValue}
            onChange={(e) => {setInputAthenticateValue(e.target.value)}}
          />
          </div>
          
          <button onClick={(e) => checkAthentication()}>Login </button>
          <button onClick={(e) => sendMail()}>send again </button>

          </div>
        </div>
      

     
     }
      </div>
    );
  }
  

export default LoginPage;