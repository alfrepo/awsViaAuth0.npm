
# Starting the project

fill the variables content with your auth0-applicaiton's parameters.
especially AUTH0_CLIENT_ID and AUTH0_DOMAIN
Get the Values from `Auth0 > Applicaitons > Settings`

    mv js-variables.js.example  js-variables.js
    vim js-variables.js  
    ...

make sure all required global npm modules (things mentioned with `npm install -g XXX` below) are installed

    npm install -g browserify
    npm install -g ...

downloading all local npm modules from package.json to node_modules

    npm install


bundle the index.js with all requred npm modules and dependencies to one bundle
browserify - it will compile once

    browserify js-index.js > generated_browserifybundle.js


start the webserver with the application on the

    port 3000
    serve -p 3000

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

fill the auth0-variables.js content with your auth0-applicaiton's parameters.
especially AUTH0_CLIENT_ID and AUTH0_DOMAIN
Get the Values from `Auth0 > Applicaitons > Settings` and use thoe values in index.js

    vim auth0-variables.js
    ...


bundle the index.js with all requred npm modules and dependencies to one bundle
browserify - it will compile once

    browserify js-index.js > generated_browserifybundle.js









installing the "serve" npm module, to host the web app
    
    npm install -g serve



start the webserver with the application on the

    port 3000
    serve -p 3000
