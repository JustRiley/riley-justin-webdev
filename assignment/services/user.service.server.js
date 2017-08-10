/**
 * Created by Justin on 7/24/2017.
 */
var app = require("../../express");
var userModel = require("../models/user.model.server");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(localStrategy));

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);



//JSON
var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];
//HTML handlers should be at top
///api/ by convention so it isn't confused with a url path
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);
//app.get("/api/user", findUser);
app.post('/api/login', passport.authenticate('local'), login);
app.post("/api/user", createUser);
//Path parameter
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.get("/api/checkLogin", checkLogin);

function deleteUser(req, response) {

    userModel
        .deleteUser(req.params.userId)
        .then(function (user) {
            response.json(user);
        })
}

//Should be towards bottom
function getAllUsers(req, response) {
    response.send(users);
}

//Path parameter
//As opposed to a query parameter ex ?1234=132
function getUserById(req, response) {
    userModel
        .findUserById(req.params.userId)
        .then(function (user) {
            response.json(user);
        })
}

function localStrategy(username, password, done) {
    userModel
        .findUserByCredentials(username, password)
        .then(
            function(user) {
                if (!user) { return done(null, false); }
                return done(null, user);
            },
            function(err) {
                if (err) { return done(err); }
            }
        );
}
//Continues to here if passport gets a valid user object
//At this point should be successfully logged in
function login(req, res) {
    var user = req.user;
    res.json(user);
}


function findUser(req, response) {
    //query parameter
    var user = req.body;
    var username = user.username;
    var password = user.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                response.json(user);
                return;
            }, function (err) {
                response.sendStatus(404).send(err);
        })
    }
    else {
        for (var u in users) {
            if (users[u].username === username) {
                response.send(users[u]);
                return;
            }
        }
        response.send("0");
    }
}

function createUser(req, response) {
    var user = req.body;
    if(user.password + "" === user.verifyPassword + "") {
        userModel
            .createUser(user)
            .then(function (user) {
                response.json(user);
        })
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