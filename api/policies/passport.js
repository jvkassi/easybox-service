/*
* Passport 
* 
* Override req functions 
*
*
*/
var http = require('http');
var methods = [
  'login',
  'logIn',
  'logout',
  'logOut',
  'isAuthenticated',
  'isUnauthenticated'
];
module.exports = function (req, res, next) {
  // Initialize Passport
  if (req.isSocket) {
    passport.initialize()(req, res, function () {
      // Use the built-in sessions
      passport.session()(req, res, function () {
        // Make the user available throughout the frontend
        // res.locals.user = req.user;
        // Make the request's passport methods available for socket
        for (var i = 0; i < methods.length; i++) {
          req[methods[i]] = http.IncomingMessage.prototype[methods[i]].bind(req);
        }
        next();
      });
    });
  } else {
    next();
  }
};