/**
 * Created by Justin on 7/24/2017.
 */
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
var app = require("../../express");
var userModel = require("../models/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/login", passport.authenticate('local'), login);
app.post("/api/register", createUser);
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.post("/api/user/:userId/friend/:username", addFriend);
app.get("/api/checkLogin", checkLogin);
app.post("/api/logout", logout);
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/project/#!/user',
        failureRedirect: '/project/#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username:  emailParts[0],
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     email,
                        books: [],
                        friends: [],
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function checkLogin(req, response) {
    response.send(req.isAuthenticated() ? req.user : '0');
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}


function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(function(user) {
                if (!user) {
                    return done(null, false);
                }
                return done(null, user);
            },
            function(err) {
                if (err) {
                    return done(err);
                }
            }
        );
}


function deleteUser(req, response) {

    userModel
        .deleteUser(req.params.userId)
        .then(function (user) {
            response.json(user);
        })
}

/*
//Should be towards bottom
function getAllUsers(req, response) {
    response.send(users);
}
*/
//Path parameter
//As opposed to a query parameter ex ?1234=132
function getUserById(req, response) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        })
}

function logout(req, res) {
    req.logOut();
    res.send(200);
}

function login(req, response) {
    var user = req.user;
    response.json(user);
}


function findUser(req, response) {
    //query parameter
    var body = req.body;
    var username = body.username;
    var password = body.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                response.json(user);
            }, function (err) {
                response.sendStatus(502).send(err);
        })
    }
    /*
    else if(username) {
        for (var u in users) {
            if (users[u].username === username) {
                response.send(users[u]);
                return;
            }
        }
        response.send("0");
    }*/
}

function createUser(req, response) {
    var user = req.body;
    //user.pageSum = 0;
    if(user.password + "" === user.verifyPassword + "") {
        userModel
            .createUser(user)
            .then(function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                response.status(400).send(err);
                            } else {
                                response.json(user);
                            }
                        });
                    }
                });
    } else {
        response.send("0");
    }
}

function updateUser(req, response) {
    var userId = req.params.userId;
    var user = req.body;

    userModel
        .updateUser(userId, user)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        })
}

function addFriend(req, response) {
    var userId = req.params.userId;
    var username = req.params.username;

    userModel
        .addFriend(userId, username)
        .then(function (user){
            response.json(user);
        })
}