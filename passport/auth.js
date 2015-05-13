// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1572944462988733', // your App ID
        'clientSecret'  : '0ba0a17c294429a056127595f5dbe4cd', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    }
};