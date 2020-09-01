import controller from '../controllers/course.controller';
import { Router } from 'express';
const router = Router();

router.get("/api/courses", async (req, res) => {
    let courses = await controller.getCourses();
    res.json({
        success: true,
        courses
    });
});


router.post("/api/courses/add", async (req, res) => {
    let body = req.body;
    let course = await controller.addCourse(body);
    res.json(course);
})

router.get("/api/course/:id", async (req, res) => {
    let course = await controller.getCourseById(req.params.id);
    res.json(course);
});

router.get("/api/course/:name/name", async (req, res) => {
    let course = await controller.getCourseByName(req.params.name);
    res.json(course);
})

module.exports = router;