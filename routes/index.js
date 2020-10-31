var express = require('express');
var router = express.Router();

//get controllers(
  var userAction = require('../controllers/userAction');
//get models
var User = require('../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '' });
});
//sign up
//get
router.get('/signUpGet',userAction.signUpGet);
//post
router.post('/signUpPost',userAction.signUpPost);
//login
router.get('/loginGet',userAction.loginGet);
const passport = require("passport");
var path = require('path');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
//login authetntciation
passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { 
          return done(err);
        };
        if (!user) {
          return done(null, false, { msg: "Incorrect username" });
        }
        if (user.password !== password) {
          return done(null, false, { msg: "Incorrect password" });
        }
        return done(null, user);
      });
    })
  ); 
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  }); 
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  router.post('/loginPost', 
  passport.authenticate('local', {
    successRedirect: '/homeGet',
    failureRedirect: '/loginGet'
  })
);
router.get('/logOut', (req, res) => {
    req.logout();
    res.redirect('/');
  });

//the home page
router.get('/homeGet',userAction.homeGet);

//sell page
//Upload route
const multer  = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images/');
  },
  filename: (req, file, cb) => {
      console.log(file);
      cb(null, Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

//selling a book
const upload = multer({ storage: storage, fileFilter: fileFilter });
router.get('/sell',userAction.sell);
router.post('/sellPost', upload.single('image'), userAction.sellPost);

//search for a book
router.post('/searchBook',userAction.searchBookPost);

router.get('/Books/:id', userAction.bookDetail);

module.exports = router;
