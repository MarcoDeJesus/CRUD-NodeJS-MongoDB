const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const CourseModel = mongoose.model("Course");

router.get("/add", (req, res) => {
    res.render("add-course");
});

router.post("/add", (req, res) => {

    var course = new CourseModel();
    course.courseName = req.body.courseName;
    course.courseDuration = req.body.courseDuration;
    course.courseFee = req.body.courseFee;
    course.courseId = Math.ceil(Math.random() * 100000000);

    course.save((err, doc) => {
        if(!err){
            //res.redirect("/courses/list");
            res.json({ message: "successful", status: "OK"});
        }else{
            res.send("Error Ocurred.");
        }
    });
})

router.get("/list", (req, res) => {
    //Getting
    CourseModel.find((err, docs) => {
        if(!err){
            console.log(docs);
            res.render("list", { data : docs });
        }else{
            res.send("Error");
        }
    });
});

module.exports = router;