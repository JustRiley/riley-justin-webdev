/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now}
}, {collection: "website"});
module.exports = websiteSchema;