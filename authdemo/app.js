var express = require("express"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    User = require("./models/user"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession = require("express-session");
    app = express();
    
mongoose.connect("mongodb://localhost/auth_demo_app", { useNewUrlParser: true });

app.use(expressSession({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false 
}));

app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=================================================
//ROUTES
//=================================================


app.get("/", function(req, res) {
    res.render("home");
})

app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
})

//Auth routes

app.get('/register', function(req, res) {
    res.render("register");
})

app.post("/register", function(req, res) {
    
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
        } else {
            res.render('register');
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        })
    });
});

//Login routes

app.get("/login",  function(req, res) {
        res.render("login");
    })


    //middleware
app.post('/login', passport.authenticate("local", {
    successRedirect: '/secret',
    failureRedirect: '/login'
    }), function(req, res) {
});


app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
})


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, function(err) {
    if(err) {
        console.log(err)
    } else {
        console.log('Server started on port 3000... ');
    }
});