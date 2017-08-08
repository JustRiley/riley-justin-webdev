/**
 * Created by Justin on 7/26/2017.
 */
var app = require("../../express");
var websiteModel = require("../models/website.model.server");

app.get("/api/user/:userId/website", findWebsitesForUser);
app.post("/api/user/:userId/website", createWebsite);
app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);
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

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            response.json(status);
        }, function (err) {
        response.sendStatus(404).send(err);
    })
}

function deleteWebsite(req, response) {
    var websiteId = req.params.websiteId;
    var developerId = req.params.userId;
    websiteModel
        .deleteWebsite(developerId, websiteId)
        .then(function (status) {
            response.json(status);
        });
}

function findWebsiteById(req, response) {
    var websiteId = req.params.websiteId;
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            response.json(website);
        })
}


function findWebsitesForUser(req, response) {
    var userId = req.params.userId;

    websiteModel
        .findWebsitesForUser(userId)
        .then(function (websites) {
            response.json(websites);
        });
}

function createWebsite(req, response) {
    var website = req.body;
    var userId = req.params.userId;

    websiteModel
        .createWebsite(userId, website)
        .then(function (newsite) {
            response.json(newsite);
        }, function (err) {
            response.sendStatus(404).send(err);
        })
}