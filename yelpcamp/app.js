var express = require('express');
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Campground  = require('./models/campground'),
    Comment = require('./models/comment'),
    seedDB = require('./seeds'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

    
User = require('./models/user')

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: "Rusty is s cute dog",
    resave: false,
    saveUninitialized: false
}));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));


app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
    console.log(req.user);
    res.locals.currentUser = req.user;
    next();
})


// seedDB();


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);




app.listen(3000, function() {
    console.log("YelpCamp server is listening on port 3000..." );
});

