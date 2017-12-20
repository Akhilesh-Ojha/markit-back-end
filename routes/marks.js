var express = require('express');
var User = require('../models/users');
var router = express.Router();

/* GET users listing. */

router.get('/new/mark', function (req, res) {
   var mark_name = req.query.name;
   var user_id="";
   var Mark = {
       name : mark_name
   };
   User.findOne({id:user_id}, function (err, user) {
       if(err){
           res.json({
               status:"error",
               data:"User not found"
           })
       }
       else{
           user.marks.push(Mark);
           user.save(function (err, result) {
               if(err){
                   res.json({
                       status:"error",
                       data:err
                   })
               }
               else{
                   res.json({
                       status:"ok",
                       data:result
                   })
               }
           })
       }
    })

});
router.get('/add/link', function (req, res) {
   var link = req.query.link;
   var folder_id = req.query.id;
   var user_id = "";
   var Mark = {

    };
   User.findOne({id : user_id}, function (err, user) {
       if(err){
           res.json({
               status: "error",
               data : err
           })
       }
       else{

       }
   })
});

router.get('/', function (req, res, next) {
    var user_id = "";
    User.find({id: user_id}, function (err, result) {
        if (err) {
            res.json({
                status: "error",
                data: err
            });
        }
        else {
            res.json({
                status: "ok",
                data: result
            });
        }
    })
});

router.get('/show', function (req, res) {
    var user_id = "";
    var mark_id = req.query.id;
    User.findOne({marks: {id: mark_id}}, function (err, result) {
        if (err) {
            res.json({
                status: "error",
                data: err
            })
        }
        else {
            res.json({
                status: "ok",
                data: result
            })
        }
    })
});

module.exports = router;
