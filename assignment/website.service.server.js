/**
 * Created by Justin on 7/26/2017.
 */
var app = require("../express");

app.get("/api/user/:userId/website", findWebsitesForUser);
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
app.delete("/api/website/:websiteId", deleteWebsite);
app.put("/api/website/:websiteId", updateWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function updateWebsite(req, response) {
    var websiteId = req.params.websiteId;
    var website = req.body;
    for(var w in websites){
        if(websites[w]._id === websiteId){
            websites[w] =  website;
            response.send(website);
            return;
        }
    }
    return "0";
}

function deleteWebsite(req, response) {
    for (var w in websites) {
        if (websites[w]._id === req.params.websiteId) {
            websites.splice(w, 1);
            response.send();
            return;
        }
    }
    return response.sendStatus(404);
}

function findWebsiteById(req, response) {
    for(var w in websites){
        if(websites[w]._id === req.params.websiteId){
            response.json(websites[w]);
            return;
        }
    }
    return response.sendStatus(404);
}


function findWebsitesForUser(req, response) {
    var userId = req.params.userId;

    var sites = [];
    for(var w in websites){
        if(websites[w].developerId === userId){
            sites.push(websites[w]);
        }
    }
    response.json(sites);
}

function createWebsite(req, response) {
    var website = req.body;
    var userId = req.params.userId;
    if(!userId){
        return response.sendStatus(404);
    }
    website.developerId = userId;
    website._id = (new Date()).getTime() + "";
    websites.push(website);
    response.json(website);
}