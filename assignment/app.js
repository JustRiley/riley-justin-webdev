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
///api/ by convention so it isn't confused wiht a url path
app.get("/api/users", getAllUsers);
app.get("/api/user/:userId", getUserById);



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