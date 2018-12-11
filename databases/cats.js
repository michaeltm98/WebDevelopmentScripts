const mongoose = require('mongoose');

//mongoose is an odm, object data mapper, lets us reference the db with js
mongoose.connect('mongodb://localhost/cat_app', {useNewUrlParser: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

var george = new Cat({
    name: "Mrs. Norris",
    age: 7,
    temperament: "Evil"
});

createCat();

function createCat() {
    Cat.create({
        name: "Snow White",
        age: 15, 
        temperament: "Bland"
    }, function(err, cat) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("cat created", cat);
        }
    });
}

function saveGeorge() {
    george.save(function(err, cat) {
        if (err) {
            console.log("error", err);
        }
        else {
            console.log("cat", cat, "saved to database");
        }
    });
}

function findCats() {
    Cat.find({}, function(err, cats) {
        if (err) {
            console.log("error", err);
        }
        else {
            console.log("cats", cats);
        }
    });
}