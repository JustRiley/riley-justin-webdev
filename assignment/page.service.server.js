/**
 * Created by Justin on 7/28/2017.
 */
var app = require("../express");

var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPageByWebsiteId);

function createPage(req, response) {
    var page = req.body;
    var websiteId = req.params.websiteId;
    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    response.send(page);
}

function findPageByWebsiteId(req, response) {
    var pagers = [];
    var websiteId = req.params.websiteId;
    for(var p in pages){
        if(pages[p].websiteId === websiteId){
            pagers.push(pages[p]);
        }
    }
    response.json(pagers);
}