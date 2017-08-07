/**
 * Created by Justin on 8/7/2017.
 */
var mongoose = require("mongoose");
var websiteSchema = mongoose.Schema({
    name: String,
    developerId: Number,
    description: String
}, {collection: "website"});
module.exports = websiteSchema;