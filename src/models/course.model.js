import mongoose, { Schema } from "mongoose"

const Course = new Schema({
    name: String,
    displayname: String,
    description: String
})

module.exports = mongoose.model('Course', Course);