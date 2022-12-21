import React, {useState} from 'react';


const Settings = () => {
    const [action, setAction] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [settingsPassword, setSettingsPassword] = useState("");



    

    const CheckContent = () => {
        setAction("checking value");
        /*if(name === ""){
            setAction("missingName");
            return;
        }
        if(email ===""){
            setAction("email");
            return;
        }
        if(settingsPassword === ""){
            setAction("password");
            return;
        }*/

        //check the validation of an email input
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if ( re.test(email) ) {
            setAction("valid email")
            // this is a valid email address
            // call setState({email: email}) to update the email
            // or update the data in redux store.
        }
        else {
            setAction("invalid email")
            return;
            // invalid email, maybe show an error to the user.
        }
       
        /*ChangeRecipeInfo()*/
      }
/*
    const ChangeRecipeInfo = async() => {
               

        fetch(`/recipes/${recipeId}/`, {
          method:'PUT',
          headers:{
            'Content-type':'application/json',
          },
          body:JSON.stringify({"name": name,
          "email": email,
          "password": settingsPassword,
          
        })
        }).then((response) => {
            if(response.status === 200){
                setAction("Changed");
                //make sure to reload the page with the new slug for the preview
                window.history.replaceState(null, `recipeId`, `${newName}`);
                window.location.reload(false);
            }else{
                setAction("something went wrong. Error: ", response.status)
            }
          
        }).catch(function(error){
          setAction(`${error}`);
          console.log('ERROR:', error)
        })
      }    
*/

  return (
    <div className="UserSavedRecipes">
        <h1>Change Settings</h1>
        <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Username"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value) }
            />
          </div>

          
          <div className="form-group">
            <input
              type="email"
              className="form-control form-control-lg"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="settingsPassword"
              className="form-control form-control-lg"
              placeholder="Enter description"
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