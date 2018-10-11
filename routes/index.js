var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Student = require("../models/student");
var Teacher = require("../models/teacher");
var Principal = require("../models/principal");
var Admin = require("../models/admin");
var AdminNotice = require("../models/adminNotice");


router.get("/",function (req,res) {
    res.render("login");
})

router.get("/dashbord", isLoggedIn, function (req,res) {
    if(req.user.type==="admin"){
        Admin.findOne({"authent.id":req.user._id},function (err,admin) {
            if(err){
                console.log(err);
            }else {
                AdminNotice.findOne({},function (err,notice) {
                    if(err){
                        console.log(err);
                    }else {
                        console.log(notice);
                        var newNotice = {
                            // topic:notice.topic,
                            // notice:notice.notice
                        }
                        console.log(newNotice);
                        res.render("admin/index",{notice:newNotice});
                        console.log(admin);
                    }
                })


            }
        })
    }else if(req.user.type==="Student"){
        Student.findOne({"authent.id":req.user._id},function (err,student) {
            if(err){
                console.log(err);
            }else {
                res.render("student/index");
                console.log(student);

            }
        })
    }else if(req.user.type==="principal"){
        Principal.findOne({"authent.id":req.user._id},function (err,principal) {
            if(err){
                console.log(err);
            }else {
                res.render("principal/index");
                console.log(principal);

            }
        })
    }else if(req.user.type==="Teacher"){
        Teacher.findOne({"authent.id":req.user._id},function (err,teacher) {
            if(err){
                console.log(err);
            }else {
                res.render("teacher/index");
                console.log(teacher);

            }
        })
    }

});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/dashbord",
        failureRedirect: "/"
    }), function(req, res){
});

router.get("*/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

module.exports = router;
