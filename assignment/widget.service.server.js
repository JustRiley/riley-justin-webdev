/**
 * Created by Justin on 7/30/2017.
 */
var app = require("../express");
var multer = require('multer');
var upload = multer({ dest: __dirname+'/../public/uploads' });

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"},
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.post("/api/page/:pageId/widget", createWidget);
app.get("/api/page/:pageId/widget", findWidgetsByPageId);
app.get("/api/widget/:widgetId", findWidgetById);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);

app.put("/api/page/:pageId/widget", sortWidget);

app.post("/api/upload", upload.single('myFile'), uploadImage);

function sortWidget(req, response) {
    //TODO: Improve this implimination to deal with arrays containing widgets for more than 1 page
    var initial = req.query.initial;
    var final = req.query.final;
    if(initial === final) {
        response.send();
        return;
    }
    var temp = widgets[initial];
    widgets.splice(initial, 1);
    widgets.splice(final, 0, temp);
    response.send(widgets);
}


function createWidget(req, response) {
    var pageId = req.params.pageId;
    var widget = req.body;
    widget.pageId = pageId;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    response.json(widget);
}

function findWidgetsByPageId(req, response) {
    var pageId = req.params.pageId;
    var widgetlist = [];
    for(var w in widgets){
        if(widgets[w].pageId === pageId){
            widgetlist.push(widgets[w]);
        }
    }
    response.json(widgetlist);
}

function findWidgetById(req, response) {
    var widgetId = req.params.widgetId;
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            response.json(widgets[w]);
            return;
        }
    }
    return response.sendStatus(404);

}

function updateWidget(req, response) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    for(var w in widgets){
        if(widgets[w]._id === widgetId){
            widgets[w] = widget;
            response.json(widget);
            return;
        }
    }
    return response.sendStatus(404);
}

function deleteWidget(req, response) {
    var widgetId = req.params.widgetId;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets.splice(w, 1);
            response.send();
            return;
        }
    }
    return response.sendStatus(404);
}

function getWidgetById(widgetId) {
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            return widgets[w];
        }
    }
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

    widget = getWidgetById(widgetId);
    widget.url = '/uploads/' + filename;

    var callbackUrl = '/assignment/#!/user/' + userId + '/website/' + websiteId + '/page/' + pageId + '/widget/' + widgetId;

    res.redirect(callbackUrl);
}
//TODO: Cannot get pic after adding