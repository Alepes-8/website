import axios from 'axios';
import React, {useState} from 'react';


const Settings = ({token, setToken}) => {
    const [action, setAction] = useState("");
    const [settingsPassword, setSettingsPassword] = useState("");



    

    const CheckContent = () => {
        setAction("checking value");
        if(!settingsPassword){
          alert("write password to change");
          return;
        }

        console.log(token);
        const change ={
          "email": token.email,
          "password": settingsPassword,

        };
        axios.put(`/users/${token.id}/`,change).then(res => {
          setAction("password was changed");
        })

      }


  return (
    <div className="UserSavedRecipes">
        <h1>Change Settings</h1>

          <div className="form-group">
            <input
              type="settingsPassword"
              className="form-control form-control-lg"
              placeholder="new password"
              name="settingsPassword"
              value={settingsPassword}
              onChange={(e) => setSettingsPassword(e.target.value)}
            />
          </div>

          <button onClick={CheckContent}> EditSettings</button>
          <p>{action}</p>
    </div>
  );
};



export default Settings;