@ECHO OFF
if not exist website (
	call git clone https://github.com/Alepes-8/website.git
)
:: change the branch and download the needed things
cd website
call git checkout develop
call npm install react-scripts --save
call npm install react-router-dom --save 
call npm install react-slugify
call npm install axios --save
call npm install --save --legacy-peer-deps @material-ui/core
call npm install websocket
call npm i react-facebook-login --force
call npm install --save --legacy-peer-deps @material-ui/core
cd ..


::fixing other batch files for starting the backend and frontends
call mkdir batchFiles
call cd batchFiles

DEL startWebsite.bat
DEL startBackend.bat

echo @ECHO OFF >> startWebsite.bat
echo call cd ..\website >> startWebsite.bat
echo call npm run start >> startWebsite.bat

echo @ECHO OFF >> startBackend.bat
echo call cd .. >> startBackend.bat
echo call env\Scripts\activate >> startBackend.bat
echo call cd backend  >> startBackend.bat
echo call python manage.py runserver >> startBackend.bat