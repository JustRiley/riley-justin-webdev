/**
 * Created by Justin on 7/30/2017.
 */
var app = require("../../express");
var widgetModel = require("../models/widget.model.server");
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../../public/uploads' });

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/page/:pageId/widget/:widgetId", deleteWidget);

app.put("/api/page/:pageId/widget", reorderWidget);

app.post("/api/upload", upload.single('myFile'), uploadImage);

function reorderWidget(req, response) {
    var pageId = req.params.pageId;
    var start = req.query.start;
    var end = req.query.end;

    widgetModel
        .reorderWidget(pageId, start, end)
        .then(function (status) {
            return response.sendStatus(200);
        })
}


function createWidget(req, response) {
    var pageId = req.params.pageId;
    var widget = req.body;

    widgetModel
        .createWidget(pageId, widget)
        .then(function (newwidget) {
            response.json(newwidget);
        }, function (err) {
            response.sendStatus(404).send(err);
        })
}

function findWidgetsByPageId(req, response) {
    var pageId = req.params.pageId;

    widgetModel
        .findWidgetsForPage(pageId)
        .then(function (widgets) {
            response.json(widgets);
        });
}

function findWidgetById(req, response) {
    var widgetId = req.params.widgetId;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            response.json(widget);
        })
}

function updateWidget(req, response) {
    var widgetId = req.params.widgetId;
    var widget = req.body;

    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (status) {
            response.json(status);
        }, function (err) {
            response.sendStatus(404).send(err);
        })
}

function deleteWidget(req, response) {
    var widgetId = req.params.widgetId;
    var pageId = req.params.pageId;

    widgetModel
        .deleteWidget(pageId, widgetId)
        .then(function (status) {
            response.json(status);
        })
}


function uploadImage(req, res) {
    
    var widgetId = req.body.widgetId;
    var width = req.body.width;
    var myFile = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename; // new file name in upload folder
    var path = myFile.path; // full path of uploaded file
    var destination = myFile.destination; // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            console.log(widget);
            widget.url = '/uploads/' + filename;
            return widget.save();})
        .then(function (widget) {
        
        var callbackUrl = '/assignment/#!/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;

        res.redirect(callbackUrl);
    })

}
