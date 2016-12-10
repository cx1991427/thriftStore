// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1806450566236694', // your App ID
        'clientSecret'  : '25ba7ad7fcea44a40f67e4682c9f2ebe', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileFields' : ['emails', 'displayName']
    },

    'twitterAuth' : {
        'consumerKey'       : 'GUZZKmYKIc84HvETTBmqUnCWx',
        'consumerSecret'    : 'PLvV0IQoYU1qDovEHzT2DYIdLWw0iI66ES8t4P3dzeuKFAHuQq',
        'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
        // 'callbackURL'       : "http://thriftstore.herokuapp.com/"
    },

    'googleAuth' : {
        'clientID'      : '383756329334-u8kibf0l20l1bt4a9vumi70tl2noh6pi.apps.googleusercontent.com',
        'clientSecret'  : 'AtYoHAg3ZvYVIhn2BylBnICS',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};