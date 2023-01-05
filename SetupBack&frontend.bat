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

if not exist backend (
	call git clone https://github.com/oliolo/backend.git
)
:: change the branch
cd backend
call git checkout develop
cd ..

::download the needed pip installs
call python -m venv . env
call env\Scripts\activate
call pip install sshtunnel
call pip install djangorestframework
call pip install django-cors-headers
call pip install mysqlclient
call pip install Django-storages
call pip install boto3
call pip install drf-writable-nested
call pip install django-ses
call pip install channels[“daphne”]
call pip install django-cors-headers
call pip install dj-rest-auth
call pip install dj-rest-auth[with_social]

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