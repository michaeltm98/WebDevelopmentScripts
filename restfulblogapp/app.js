const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

// APP config
// mongoose.connect("mongodb://localhost:27017/restful_blog_app", {useNewUrlParser: true}, function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Successfully connected to database...");
//     }
// });

// mongoose.connect("mongodb://ian:secretPassword@107.23.245.181:27017/cool_db", {useNewUrlParser: true}, function(err) {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log("Successfully connected to database...");
//     }
// });
mongoose.connect('mongodb://localhost:27017/placestogo', {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//must come after app.use body parser
app.use(expressSanitizer());

// mongoose/model config
const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date, 
        default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);


// Routes

app.get('/', function(req, res) {
    res.redirect('/blogs')
});

app.get('/blogs', function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs: blogs});
        }
    })
});

app.get("/blogs/new", function(req, res) {
    res.render("new");
})

app.post('/blogs', function(req, res) {

    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            res.render("new");
            console.log(`Error creating blog ${err}`);
        }
        else {
            console.log(`Created blog ${blog}`);
            res.redirect('/blogs')
        }
    });
});

app.get('/blogs/:id', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err) {
            res.redirect("index");
        } else {
            res.render("show", {blog: blog});
        }
    });
});

app.get('/blogs/:id/edit', function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("edit", {blog: blog});
        }
    });
});

app.put('/blogs/:id', function(req, res) {

    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog) {
        if(err) {
            res.redirect("/blogs");
            console.log(`Error updating blog ${err}`);
        } else {
            console.log(`Updated blog ${blog}`);
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

app.delete('/blogs/:id', function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

app.listen('3000', function() {
    console.log('Server is listening on port 3000...')
});