const express = require("express");
const courseController = require("../controllers/courseController");
const router = express.Router();

router.route("/").post(courseController.createCourse); //localhost:3000/courses
router.route("/").get(courseController.getAllCourses); //localhost:3000/courses
router.route("/:slug").get(courseController.getCourse); //localhost:3000/courses/id

module.exports = router;
