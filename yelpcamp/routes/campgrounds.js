var express = require('express');
var router = express.Router();

//INDEX
router.get('/campgrounds', function(req, res) {
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
router.post('/campgrounds', function(req, res) {
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
router.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

//SHOW
router.get('/campgrounds/:id', function(req, res) {
    var id = req.params.id;
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground, campground});
        }
    });
    
});


module.exports = router;