var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var campgrounds = [
    {name: "Mount Assiniboine Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6655992_compressed.jpg"},
    {name: "Pacific Rim National Park Reserve", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6656172_compressed.jpg"},
    {name: "Mount Robson Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6657310_compressed.jpg"},
    {name: "Mount Assiniboine Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6655992_compressed.jpg"},
    {name: "Pacific Rim National Park Reserve", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6656172_compressed.jpg"},
    {name: "Mount Robson Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6657310_compressed.jpg"},
    {name: "Mount Assiniboine Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6655992_compressed.jpg"},
    {name: "Pacific Rim National Park Reserve", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6656172_compressed.jpg"},
    {name: "Mount Robson Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6657310_compressed.jpg"},
    {name: "Mount Assiniboine Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6655992_compressed.jpg"},
    {name: "Pacific Rim National Park Reserve", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6656172_compressed.jpg"},
    {name: "Mount Robson Provincial Park", image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6657310_compressed.jpg"},
];


app.get('/', function(req, res) {
   res.render("landing")
});

app.get('/campgrounds', function(req, res) {
    res.render('campgrounds', {campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    campgrounds.push(newCampground);

    res.redirect("/campgrounds");
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

app.listen(3000, function() {
    console.log("YelpCamp server is listening on port 3000...")
});