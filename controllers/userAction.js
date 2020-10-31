
//get models
var User = require('../models/Users');
const Book = require('../models/Book');

//get required modules.
var fs = require('fs');
var async = require('async');
const path = require("path");
const multer  = require('multer');
var url = require('url');


const passport = require("passport");
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

//signup
//get
exports.signUpGet = function(req, res){
    res.render('signup', {title: 'Sign Up to Buy or Sell Books'});
};
//post: save new user and redirect to login
exports.signUpPost = function(req, res, next){
    //process requst
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    }).save(err => {
        if(err){
            return next(err);
        }
        res.render('login', {title:'Signing With Your New Username and Password'});
    });
};
//login
//display loginPage
exports.loginGet = function(req, res){
    res.render('login', {title:'Login'});
};

//home
exports.homeGet = function(req, res){
    res.render('home', {title: ''});
};

// sell 
exports.sell = function(req, res){
    res.render('sell', {title: ''});
};



/* post a book */
exports.sellPost = function(req, res, next){
    //get image name;
    
    //process requst
    const book = new Book({
        ispn: req.body.ispn,
        coursename: req.body.coursename,
        coursenumber: req.body.coursenumber,
        booktitle: req.body.booktitle,
        price: req.body.price,
        imagename: req.file.filename,
        username: req.user.username,
    }).save(err => {
        if(err){
            return next(err);
        }
        res.render('home', {title:''});
    });
    
};

/*search for a book */
exports.searchBookPost = function(req, res){
    Book.find({}, 'ispn coursename coursenumber booktitle price imagename')
    .exec(
        function(err, bookList){
            if(err) {return next(err);}
            res.render('searchResult', {title: 'search result', bookList: bookList, searchSubject: req.body.searchSubject});
        }
    );
  
}
exports.bookDetail = function(req, res, next){
    async.parallel({
        record: function(callback){
            Book.findById(req.params.id).exec(callback)
        },},function(err, results){
            if(err){return next(err);}
            res.render('bookD', {title: '', record: results.record});
    });
}