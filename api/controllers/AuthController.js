/**
 * Authentication Controller
 *
 * This is merely meant as an example of how your Authentication controller
 * should look. It currently includes the minimum amount of functionality for
 * the basics of Passport.js to work.
 */
var AuthController = {

    index: function(req, res) {
        // sails.log.verbose("check")
        sails.log.silly(req.session);
        if (req.session.passport.user) {
            sails.log.verbose('user connected');
            res.json({
                id: req.session.passport.user
            });
        } else {
            sails.log.verbose('user disconnected');
            res.send(401); // res.send(401, Vj{
        }
    },
    info: function(req, res) {
        if (req.session.passport.user) {
            sails.log.verbose('user connected');
            User.findOne(req.session.passport.user).exec(function(err, user) {
                if (!err) {

                    res.send(user);
                }
            })
        } else {
            sails.log.verbose('user disconnected');
            res.send(401); // res.send(401, Vj{
            //
        }
    },
    /**
     * Log out a user and return them to the homepage
     *
     * Passport exposes a logout() function on req (also aliased as logOut()) that
     * can be called from any route handler which needs to terminate a login
     * session. Invoking logout() will remove the req.user property and clear the
     * login session (if any).
     *
     * For more information on logging out users in Passport.js, check out:
     * http://passportjs.org/guide/logout/
     *
     * @param {Object} req
     * @param {Object} res
     */
    logout: function(req, res) {
        req.logout();
        res.send(200);
    },
    /**
     * Render the registration page
     *
     * Just like the login form, the registration form is just simple HTML:
     *
        <form role="form" action="/auth/local/register" method="post">
          <input type="text" name="username" placeholder="Username">
          <input type="text" name="email" placeholder="Email">
          <input type="password" name="password" placeholder="Password">
          <button type="submit">Sign up</button>
        </form>
     *
     * @param {Object} req
     * @param {Object} res
     */
    register: function(req, res) {
        // console.log(req.params.all());
        // login identifier
        // if (req.param('email') === undefined) {
        //   req.flash('error', res.i18n('Error.Passport.Email.Missing'));
        // }
        // if (req.param('username') === undefined) {
        //   req.flash('error', res.i18n('Error.Passport.Username.Missing'));
        // }
        // if (req.param('password') === undefined) {
        //   req.flash('error', res.i18n('Error.Passport.Password.Missing'));
        // }
        function tryAgain(err) {
                // If an error was thrown, redirect the user to the login which should
                // take care of rendering the error messages.
                sails.log.error(err);
                res.send(401, {
                    errors: utility.translateErrorCode(req.flash('error'), res),
                    // errors: res.i18n(req.flash('error')),
                });
            }
            // sails.log.info("try login ", req.params.all());
            // process login or registration
        sails.log.verbose('processing passport callback');
        passport.register(req, res, function(err, user) {
            // console.log(req.params.all());
            // sails.log.verbose('login return');
            if (err)
                return tryAgain(err);
            req.login(user, function(loginErr) {
                if (loginErr)
                    return tryAgain(err);
                // Upon successful login, send the user informations
                res.send(user);
            });
        });
    },
    /**
     * Create a third-party authentication endpoint
     *
     * @param {Object} req
     * @param {Object} res
     */
    provider: function(req, res) {
        passport.endpoint(req, res);
    },
    /**
     * Create a login endpoint
     *
     * This endpoint handles everything related to creating and verifying Pass-
     * ports and users, both locally and from third-aprty providers.
     *
     * Passport exposes a login() function on req (also aliased as logIn()) that
     * can be used to establish a login session. When the login operation
     * completes, user will be assigned to req.user.
     *
     * For more information on logging in users in Passport.js, check out:
     * http://passportjs.org/guide/login/
     *
     * @param {Object} req
     * @param {Object} res
     */
    login: function(req, res) {
        // console.log(req.params.all());
        // login identifier
        if (!req.param('identifier')) {
            req.flash('error', 'Error.Passport.Username.Missing');
        }
        if (!req.param('password')) {
            req.flash('error', 'Error.Passport.Password.Missing');
        }

        function tryAgain(err) {
                // If an error was thrown, redirect the user to the login which should
                // take care of rendering the error messages.
                // if (err)
                //     sails.log.verbose(err);
                // sails.log.verbose(req.flash('error'));
                res.send(401, {
                    errors: err.message
                });
            }
            // sails.log.info("try login ", req.params.all());
            // process login or registration
        sails.log.verbose('processing passport callback');
        passport.login(req, res, function(err, user) {
            // console.log(req.params.all());
            sails.log.verbose('login return');
            if (err)
                return tryAgain(err);
            req.login(user, function(loginErr) {
                if (loginErr)
                    return tryAgain(err);
                // store user in session
                // req.session.user = user;
                // Upon successful login, send the user informations
                res.send(user);
            });
        });
    }
};
module.exports = AuthController;
