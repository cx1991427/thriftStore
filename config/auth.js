// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1806450566236694', // your App ID
        'clientSecret'  : '25ba7ad7fcea44a40f67e4682c9f2ebe', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'GUZZKmYKIc84HvETTBmqUnCWx',
        'consumerSecret'    : 'PLvV0IQoYU1qDovEHzT2DYIdLWw0iI66ES8t4P3dzeuKFAHuQq',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
        // 'callbackURL'       : 'http://127.0.0.1:3000/auth/twitter/callback?oauth_token=MbmwEwAAAAAAyUp-AAABWOXUc_Q&oauth_verifier=cFn1Lk3I1dLB8ld8jizj5Eks5xeuvcCx'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    },
    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};