var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//SCHEMA SETTUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);



function createCampground() {
    Campground.create({
        name: "Pacific Rim National Park Reserve",
        image: "https://s-i.huffpost.com/gadgets/slideshows/484816/slide_484816_6656172_compressed.jpg"},
        function(err, campground) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("campground", campground);
            }
        });
}

function getCampgrounds(){
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Campgrounds fetched", campgrounds);
            return campgrounds;
        }
    });
}






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
    Campground.find({}, function(err, campgrounds) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Campgrounds fetched");
            res.render('campgrounds', {campgrounds: campgrounds});
        }
    });
    
});

app.post('/campgrounds', function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    
    Campground.create(newCampground, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Campground created")
            res.redirect("/campgrounds");
        }
    })
});

app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

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