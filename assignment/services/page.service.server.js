/**
 * Created by Justin on 7/28/2017.
 */
var app = require("../../express");
var pageModel = require("../models/page.model.server");

app.post("/api/website/:websiteId/page", createPage);
app.get("/api/website/:websiteId/page", findPageByWebsiteId);
app.get("/api/page/:pageId", findPageById);
app.delete("/api/website/:websiteId/page/:pageId", deletePage);
app.put("/api/page/:pageId", updatePage);

function deletePage(req, response) {
    var pageId = req.params.pageId;
    var websiteId = req.params.websiteId;

    pageModel
        .deletePage(websiteId, pageId)
        .then(function (status) {
            response.json(status);
    })
}

function updatePage(req, response) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        })
}

function createPage(req, response) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    pageModel
        .createPage(websiteId, page)
        .then(function (newpage) {
            response.json(newpage);
        }, function (err) {
            response.sendStatus(404).send(err);
        })
}

function findPageByWebsiteId(req, response) {
    var websiteId = req.params.websiteId;

    pageModel
        .findPagesForWebsite(websiteId)
        .then(function (pages) {
            response.json(pages);
        });
}

function findPageById(req, response) {
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            response.json(page);
        })
}