'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
User         = mongoose.model('User');

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Login form
 */
 exports.signin = function(req, res) {
    res.render('signin');
 };

/**
 * Login
 */
exports.login = function(req, res) {
    var username = req.body.username || req.query.username,
    password     = req.body.password || req.query.password;

    if(!username){
        // return res.render('signin', {
        //     error: 'Invalid username'
        // });
        return res.json({
            error: 'Invalid username'
        });
    }

    User.findOne({ username: username }, function(err, doc){

        if(doc){

            if( doc.authenticate(password) ){
                req.session.user = doc;
                // res.redirect('/play');
                var userData = doc.toObject();
                delete userData.password;
                delete userData.hashed_password;
                delete userData.salt;
                res.json({
                    success: true,
                    user: userData
                });
            } else {
                // res.render('signin', {
                //     error: 'Incorrect password'
                // });
                res.json({
                    error: 'Incorrect password'
                });
            }

        } else {
            // res.render('signin', {
            //     error: 'User not found'
            // });
            res.json({
                error: 'User not found'
            });
        }

    });
};

/**
 * Sign up
 */
exports.signup = function(req, res) {
    res.render('signup');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    delete req.session.user;
    res.redirect('/');
};

/**
 * Create user
 */
exports.create = function(req, res, next) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            console.error('Signup error', err);

            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default:
                    message = 'Please fill all the required fields';
            }

            return res.render('signup', {
                error: message
            });
        }

        req.user = user;
        res.redirect('/play');
    });
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.json(req.session.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
