
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'eu-west-1';


// Function invoked by button click
function awsPollySpeakText(oauthidentity_token) {
    console.log("Received id_token: " + oauthidentity_token);
    console.log("Received AUTH0_DOMAIN: " + AUTH0_DOMAIN);
    console.log("Received AWS_COGNITO_IDENTITY_POOL_ID: " + AWS_COGNITO_IDENTITY_POOL_ID);

    var audioSource = document.querySelector('#audioSource');
    var audioPlayback = document.querySelector('#audioPlayback');


    var aws_logins = {};

    // taking the domain from the auth0 variables. taking the identity token from theargument 
    aws_logins[AUTH0_DOMAIN] = oauthidentity_token;

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: AWS_COGNITO_IDENTITY_POOL_ID,
        Logins: aws_logins
    });


    // Create synthesizeSpeech params JSON
    var speechParams = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: "",
        TextType: "text",
        VoiceId: "Matthew"
    };
    speechParams.Text = document.getElementById("textEntry").value;


    // Create the Polly service object and presigner object
    var polly = new AWS.Polly({ apiVersion: '2016-06-10' });
    var signer = new AWS.Polly.Presigner(speechParams, polly)

    // Create presigned URL of synthesized speech file
    signer.getSynthesizeSpeechUrl(speechParams, function (error, url) {
        if (error) {
            document.getElementById('awspollyurl').innerHTML = error;
            document.getElementById('awspollyurl').innerHTML = document.getElementById('awspollyurl').innerHTML + "You probably have to login first.";
        } else {
            document.getElementById('awspollyurl').innerHTML = url;
            audioSource.src = url;
            audioPlayback.load(); //call this to just preload the audio without playing
        }
    });
}