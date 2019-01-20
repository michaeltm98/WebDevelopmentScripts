var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Campground  = require('./models/campground');
var Comment = require('./models/comment');
var seedDB = require('./seeds');
var passport = require('passport');
var LocalStrategy = require('passport-local');
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



seedDB();


app.get('/', function(req, res) {
   res.render("landing")
});

//INDEX
app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Campgrounds fetched");
            res.render('campgrounds/index', {campgrounds: campgrounds});
        }
    });
    
});

//CREATE
app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description}
    
    Campground.create(newCampground, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campground created")
            res.redirect("/campgrounds");
        }
    })
});

//NEW
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

//SHOW
app.get('/campgrounds/:id', function(req, res) {
    var id = req.params.id;
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground, campground});
        }
    });
    
});


//=========================================
//comment routes
//====================================
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render('comments/new', {campground: campground})
        }
    });
});

app.post('/campgrounds/:id/comments/new', isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            res.redirect('/campgrounds');
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect(`/campgrounds/${campground._id}`)
                }
            })
        }
    })
})

//Auth routes
app.get('/register', function(req, res) {
    res.render('register');
});

app.post('/register', function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(new User(newUser), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/campgrounds');
            });
        }
    })
})

app.get('/login', function(req, res) {
    res.render("login");
});

app.post('/login', passport.authenticate("local", 
    {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }), 
    function(req, res) {
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } 
    res.redirect("/login");
}



app.listen(3000, function() {
    console.log("YelpCamp server is listening on port 3000..." );
});





























var surprisedPikachu = `--------+hyyyyyyyyyhdmmmmmdhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyydhhyso+//::::::::///////////++++
------+yyyyyyyyyyyhdddmmmmmdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhhhyso+//::::::////+++++ooooosss
:/+osyyyyyyyyyyyyyddddmmmmmdhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhhyso+//:::::///+++oooosssyyyyh
yyyyyyyyyyyyyyyyyhdddmmmmmmmdyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhhyso+//:::::///++oossssyyyhhhd
yyyyyyyyyyyyyyyyhhddddmmmmmmmhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhyso+//::::://++oosssyyyhhhddd
yyyyyyyyyyyyyyyhhhhddddmmmmmmdhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhyso+//::::://++oosssyyyhhhddd
yyyyyyyyyyyyyyyhhhhdddddddddddhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhyso++//:::///++oosssyyyhhhddd
yyyyyyyyyyyyyyhhhhhhdddddddddddhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhsso+//////+++oossssyyyyhhddd
yyyyyyyyyyyyhdddddhhhhhhhhhhhddhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhysoo+++++++oooossssyyyyhhhdd
yyyyyyyyyyyyhmdddddsyhyyyyyhhhhdhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhyssoooooooosssssssyyyyyhhdd
yyyyyyyyyyyydNmddds-::+osyyyhhhhhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhyyyssssssssssssssssyyyyhhdd
yyyyyyyyyyyhdddddds-----::+syhhhdhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhdhhhhhhhhhhhhhhhhhhhhhhyddm
yyyyyyyyyyhyyyyyddy---------:/sydhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyydddddddddddddddmdhyo+/::ddd
yyyyyyyyyyhsssssydm:-----------:/oyhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhmmmmmmmmmmdhyo/::-----:mdd
yyyyyyyyyhysssssyyhy--------------:/syhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyhdmmmmmdys+::----------+ddm
yyyyyyyyhysssssyyyyds----------------:+yhyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyddhyo/:---------------hdmm
yyyyyyyyhysssssyyhhhds------------------/shyyyyyyyyyyyyyyyyyyyyyyyyyyyhhys+/:------------------ommmm
yyyyyyyhysssssyyyhhdddy:------------------/yhyyyyyyssssssooooooosssyys+/:---------------------+mmmmm
yyyyyyhhyyysssyyhhhdddmh/------------------:/:::::------------------:------------------------+dmdmmm
yyyyyyhhyyyyyyyhhhdddmmmds:----------------------------------------------------------------:sddddddd
yyyyyhddhhhhhhhddddddmmmmmdo:-------------------------------------------------------------+yhhhhhddd
yyyyyddddddddddddddmmmmmmmmmh+:-://----------------------------------------------------:/syyyyyyhhdd
yyyyhmmmmmmmmmmmmmmmmmmmmmmmmmdo+:----------------------------------------------//---/oyyssyyyyyhhdd
yyyhmmmmmmmmmmmmmmmmmmmmmmmmmmm+-------------------------------------------------/+oyhhyyyyyyyyhhhdd
yyydmmmmmNNNNNNmmmmmmmmmmmmmmmo----------:--------------------------::------------:sdhhyyyyyyhhhhddd
yyhmmmNNNNNNNNNNNmmmmmmmdddddy--------:++syo:---------------------:++sy+------------sdhhhhhhhhhhdddd
yhdmmNNNNNNNNNNNNmmmmmmdddddh:--------y:\`-dds---------------------h-\`:ddo------------hdhhhhhhddddddd
ydmmmNNNNNNNNNNNNNmmmmmddddd/---------hhyhddy---------------------dhyhddo------------/dddddddddddddm
hmmmNNNNNNNNNNNNNNmmmmmddddy----------/yhdhs:---------------------/yhdhs:-------------ydddddddddddmm
dmmmNNNNNNNNNNNNNNmmmmmdddd:------------:::--------///:-------------:::---------------:dddddmmmdmmmm
mmmmNNNNNNNNNNNNNNmmmmdddds---::::----------------:yhhy:-------------------:::::-------smmmmmmmddmmm
mmmmmNNNNNNNNNNNmmmmmddddd::+osssoo/-------------------------------------/oossso+/-----:dddddddddddm
dmmmmmmmmmmmmmmmmmmdddddhh-ossssssss+-----------------------------------osssssssss/-----oddddddddddd
dmddddddddddddddddddhhhhhs-ossssssss+-------------:/+ooooo+/------------sssssssssso-----:dhhhhhddddd
dddddddddhhhhhhhhhhhhhyyys-:+osssso/-------------+s+///////s+-----------/ossssssso:------ohhhhhhhddd
dddhhhhhhyyyyyyyyyyyyyyyyh:---:::----------------y//////////y-------------:/+++/:--------:hyyyyhhhdd
ddhhhyyyyyyyyyyyyysssssyyys----------------------/s+///////+s-----------------------------syyyyyhhdd
ddhhhyyyyyssssssssssssssyyh+----------------------:+ooo++ooo:-----------------------------/hyyyyhhdd
ddhhhyyyyyysssssssssssssyyyh+-------------------------::::---------------------------------yyyyyhhdd
ddhhhhyyyyyyyyyyyyyyyyyyyyyyh+-------------------------------------------------------------oyyyhhhdd
dddhhhhhyyyyyyyyyyyyyyyyyyhhhdo------------------------------------------------------------/hyhhhddd
hhhhhhhhhhhhhhhhhhhhhhhhhhhhhdh-------------------------------------------------------------hhhhdddd
hhhhhddhhhhhhhhhhhhhhhhhhhddddo-------------------------------------------------------------yddddddm
yhhhhddddddddddddddddddddddddd--------------------------------------------------------------odddddmm`