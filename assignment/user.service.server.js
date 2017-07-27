/**
 * Created by Justin on 7/24/2017.
 */
var app = require("../express");
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
app.get("/api/user", findUser);
app.post("/api/user", createUser);
//Path parameter
app.put("/api/user/:userId", updateUser);



//Should be towards bottom
function getAllUsers(req, response) {
    response.send(users);
}

//Path parameter
//As opposed to a query parameter ex ?1234=132
function getUserById(req, response) {
    for (var u in users) {
        if(users[u]._id === req.params.userId) {
            response.send(users[u]);
        }
    }
}

function findUser(req, response) {
    //query parameter
    var username = req.query.username;
    var password = req.query.password;

    if(username && password) {
        for (var u in users) {
            //can't just do var user= u; since u is just an index
            var _user = users[u];
            if (_user.username === username && _user.password === password) {
                response.send(_user);
                return;
            }
        }
        response.send("0");
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
        user._id = (new Date()).getTime() + "";
        users.push(user);
        response.send(user);
    } else {
        response.send("0");
    }
}
//Path param
function updateUser(req, response) {
    var userId = req.params.userId;
    var user = req.body;
    for (var u in users) {
        if (users[u]._id === userId) {
            users[u] = user;
            response.send(user);
            return;
        }
    }
}