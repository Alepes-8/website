import React, {useState} from 'react'
import FacebookLogin from 'react-facebook-login';
import fbLogin from './fbLogin';
import './authentication.css';
import axios from 'axios';
import { Checkbox } from '@material-ui/core';

const LoginPage = ({token, setToken}) => {

    const [userEmail, setUserEmail] = useState("");
    const [password, setPassword] = useState("");
    const [shouldAthenticate, setShouldAthenticate] = useState(false);
    const [athenticate, setAthenticate] = useState(false);
    const [athCode, SetAthCode] = useState();
    const [inputAthenticateValue, setInputAthenticateValue] = useState(1)
    const [userData, setUserData] = useState();
    let testValue = 0;
    // User Login info, temp database
    function checkAthentication(){
      console.log(inputAthenticateValue, athCode, testValue)
      if(athCode.toString() !== inputAthenticateValue){
        alert("wrong code")
        testValue = 0;
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
      contactFormData.append('email', 'oskar.m7011e@gmail.com')
      contactFormData.append('query', testValue)
      console.log( " data", contactFormData,testValue)
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
        var val = Math.floor(1000 + Math.random() * 9000);
        console.log(val);
        SetAthCode(val);
        testValue = val;

          if(shouldAthenticate){
           
            setAthenticate(true);
            console.log(res)
            const userTest = {
              id: res.data.id,
              email: res.data.email,
              password: password, 
              admin: res.data.is_staff,
              supAdmin: res.data.is_superuser,
              token: res.data.token,
            }
            console.log("userdata");
            console.log("userdata", userTest);
            console.log(athCode)
            console.log(testValue)
            setUserData( userTest)
            
  
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

    const responseFacebook = async (response) => {
      let fbResponse = await fbLogin(response.accessToken);
      console.log("fbR ", fbResponse);
      console.log("R ", response);
      if(fbResponse === 200){
        const userResult= { 
          id: null,
          email: response.email,
          password: password, 
          admin: false,
          supAdmin: false,
          token: response.key,
        };
        console.log("result ", userResult)
        setToken(userResult);
      }
      
    };

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

          <div className="SocialLogin">
              <FacebookLogin
                appId= 'YOUR_FACEBOOK_APP_ID'
                fields="name,email"
                callback={responseFacebook}
              />
          </div>

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