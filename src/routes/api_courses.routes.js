const express = require("express");
const Router = express.Router();

const controller = require("../controllers/course.controller");

Router.get("/api/courses", (req, res) => {
    let courses;
});

Router.get("/api/course/:id", async (req, res) => {
    let course = await controller.getCourseById(req.params.id);
    res.json(course);
});

Router.get("/api/course/:name/name", async (req, res) => {
    let course = await controller.getCourseByName(req.params.name);
    res.json(course);
})

Router.post("/api/addcourse", async (req, res) => {
    let body = req.body;
    let course = await controller.addCourse(body);
    res.json(course);
})

module.exports = Router;