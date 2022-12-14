# Setting Up the Project on your computer method 1
 - Install nodeJS. Try the recomended version or newer. Should still work with anything above version 18.3.0
 - Download the ReactAlepesSetup and place it where you want to set up the front end. Then run it. With it you will install the respoitory and the needed imports.
 - Then you just need to install the backend https://github.com/oliolo/backend which has it's own installation.

# Setting Up the Project on your computer method 2
 - Install nodeJS. Try the recomended version or newer. Should still work with anything above version 18.3.0

 - Download the SetupBack&frontend where you want to have your application and run it
       - with it a frontend by react and backend should work. After you make sure the private keys are placed correctly. Follow https://github.com/oliolo/backend instruction for the placement

# Setting Up the Project on your computer method 3

- Install nodeJS. Try the recomended version or newer. Should still work with anything above version 18.3.0
- Clone the reposity onto your computer and run the three two commands. ( though this can couse issues due to the global behavior of it. So for more info read "Possible problems")
    - git checkout develop
    - npm install react-scripts --save
    - npm install react-router-dom --save 
    - npm install react-slugify
    - npm install axios --save
    - npm install --save --legacy-peer-deps @material-ui/core
    - npm install websocket
    - npm i react-facebook-login --force
    - npm install --save --legacy-peer-deps @material-ui/core
- After that you should only need to run "npm run start" to start the code or run the batchfile "start"
- Backend which it is adjusted for is https://github.com/oliolo/backend which has it's own installation.


## If you have problems
- If npm does not work, check the nodejs version and that it really is downloaded. [Possible help to the solution](https://linuxhint.com/npm-not-recognized-internal-external-command/)that can help .

## Possible problems 
  - "npm install react-scripts --save" can cause issues with other projects... you should NOT install react-scripts globally like this. https://github.com/facebook/create-react-app/issues/2436#issuecomment-306830791 for more information

## Getting Social Login to work

Run the frontend on https to work with facebook social login.
Go to https://developers.facebook.com/apps and create a new app. 
Select the app???s type as Business and leave everything as default. 
Go ahead and create the app. You will be redirected to the new app???s dashboard page. 
On the sidebar, you will get a link that says, ???Add product???. Click it. Then find the ???Facebook Login??? and click on its Set Up button.
Next, choose WEB, and in the site, URL input box write ???localhost:8000???. 
After this, click save and keep clicking on continue.
Look at the sidebar and click on Settings>Basic. 
There you will get App ID which you want to place on line 163 in the LoginPage.jsx file in the React frontend.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
