
# Starting the project

Downloading all npm dependencies from `package.json`to node_modules.
This is a npm native command.

    npm install


Merge the javascript modules to one generated file.
This is a custom script, defined in package.json

    npm browserify


start the webserver with the application on the port 3000 using hte npm `serve` module.
This is a custom script, defined in package.json

    npm start


# All project creation steps 



create the npm package.json

    npm init



install npm module browserify - allowing to package
    
    npm module javascript with dependencies
    npm install -g browserify





install the auth0 npm-module locally, with all dependencies

    npm install --save auth0-js@9.0.0



add manually the files index.html,
implement the html for the simple app

    touch index.html
    FILL index.html HERE


add manually the file index.js,
add js functionality, referencing html from index.html
import the "auth0-js" npm module via "require"

    touch index.js
    FILL index.js HERE


bundle the index.js with all requred npm modules and dependencies to one bundle
browserify - it will compile once

    browserify js-index.js > generated_browserifybundle.js





installing the "serve" npm module, to host the web app
    
    npm install serve



start the webserver with the application on the

    port 3000
    serve -p 3000
