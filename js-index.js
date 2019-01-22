// imported and will be compiled via "browserify"
var auth0 = require('auth0-js')

window.addEventListener('load', function() {
    var content = document.querySelector('.content');
    var loadingSpinner = document.getElementById('loading');
    content.style.display = 'block';
    loadingSpinner.style.display = 'none';
  
    var webAuth = new auth0.WebAuth({
      domain: AUTH0_DOMAIN,
      clientID: AUTH0_CLIENT_ID,
      redirectUri: AUTH0_CALLBACK_URL,
      responseType: 'token id_token',
      scope: 'openid',
      leeway: 60
    });
  
    var authstatus = document.querySelector('#authstatus');
    var authTokens = document.querySelector('#authtokens');
    var loginView = document.getElementById('login-view');
    var homeView = document.getElementById('home-view');
  
    // buttons and event listeners
    var homeViewBtn = document.getElementById('btn-home-view');
    var loginBtn = document.getElementById('qsLoginBtn');
    var logoutBtn = document.getElementById('qsLogoutBtn');
  
  
    loginBtn.addEventListener('click', function(e) {
      e.preventDefault();
      webAuth.authorize();
    });
  
    logoutBtn.addEventListener('click', logout);
  
    function setSession(authResult) {
      // Set the time that the access token will expire at
      var expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
      );
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
    }
  
    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      displayAuthStatus();
    }
  
    function isAuthenticated() {
      // Check whether the current time is past the
      // access token's expiry time
      var expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }
  
    function handleAuthentication() {
      webAuth.parseHash(function(err, authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
          window.location.hash = '';
          setSession(authResult);
        } else if (err) {
          console.log(err);
          alert(
            'Error: ' + err.error + '. Check the console for further details.'
          );
        }
        displayAuthStatus();
      });
    }
  
    function displayAuthStatus() {
      if (isAuthenticated()) {
        authstatus.innerHTML = 'You are logged in!';

        authtokens.innerHTML = 
        "<table>"
        + "<tr><td>access_token</td>" + "<td>" + localStorage.getItem('access_token') + "</td></tr>"
        + "<tr><td>id_token</td>" + "<td>" + localStorage.getItem('id_token') + "</td></tr>"
        + "<tr><td>expires_at</td>" + "<td>" + localStorage.getItem('expires_at') + "</td></tr>"
        + "</table>";

        // use the id token to call the AWS service "polly"
        awsPollySpeakText(localStorage.getItem('id_token'));
      } else {
        authstatus.innerHTML =
          'You are not logged in! Please log in to continue.';
      }
    }
  
    handleAuthentication();
  });
  