const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
    name: String,
    displayname: String,
    description: String
})

module.exports = mongoose.model('Course', Course);