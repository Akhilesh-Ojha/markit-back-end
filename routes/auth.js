var express = require('express');
var router = express.Router();

var middleware = require('../config/middleware');
var jwt = require('jsonwebtoken');
var User = require('../models/users');
var passwordHash = require('password-hash');


router.post('/signin', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({email: email}, function (err, user) {
        if (!user) {
            res.json({
                status: "error",
                data: "Authentication failed. User not found"
            })
        }
        else if (user) {
            if (!passwordHash.verify(password, user.password)) {
                res.json({
                    status: "error",
                    data: "Authentication failed. Wrong Password"
                })
            }
            else {
                var token = jwt.sign(user.toJSON(), req.app.get('superSecret'), {
                    expiresIn: '2h'
                });
                res.json({
                    status: "ok",
                    data: {
                        token: token
                    }
                })
            }
        }
    })
});

router.post('/signup', function (req, res) {

    var user = {
        email: req.body.email,
        password: passwordHash.generate(req.body.password),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        createdAt: Date.now(),
        displayName: req.body.firstName + " " + req.body.lastName
    };
    User.create(user, function (err, createdUser) {
        if (err) {
            console.log(err);
            res.json({
                status: "error",
                data: err
            })
        }
        else {
            createdUser.save();
            res.json({
                status: "ok",
                data: createdUser
            })
        }
    });
});

module.exports = router;