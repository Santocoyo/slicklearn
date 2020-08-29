const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
    res.render("index");
})

Router.all("*", (req, res) => {
    res.render("404");
});

module.exports = Router;