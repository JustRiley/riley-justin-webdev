/**
 * Created by Justin on 7/24/2017.
 */
var app = require("../../express");
var userModel = require("../models/user.model.server");


//app.get("/api/users", auth, getAllUsers);
app.get("/api/user/:userId", getUserById);
app.get("/api/user", findUser);
app.post("/api/user", createUser);
//Path parameter
app.put("/api/user/:userId", updateUser);
app.delete("/api/user/:userId", deleteUser);
app.post("/api/user/:userId/friend/:username", addFriend);

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
            console.log(user);
            response.json(user);
        })
}




function findUser(req, response) {
    //query parameter
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                response.json(user);
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
    //user.pageSum = 0;
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

function addFriend(req, response) {
    var userId = req.params.userId;
    var username = req.params.username;

    userModel
        .addFriend(userId, username)
        .then(function (user){
            response.json(user);
        })
}