require("dotenv").config();
// require the express
const express = require("express");
const path = require("path");
const db = require("./config/mongoose");
const sassMiddleware = require("node-sass-middleware");
const app = express();
const port = process.env.PORT || 8000;

// body parser
app.use(express.urlencoded({
    extended: true
}));

// set up the sass middleware
app.use(sassMiddleware({
    src: path.join(__dirname, "assets", "sass"),
    dest: path.join(__dirname, "assets", "css"),
    debug: true,
    outputStyle: "expanded",
    prefix: "/css"
}));

// tell express which template engine we are using
app.set("view engine", "ejs");

// Now we have to tell the express.js where the view folders is
// __dirname is the current directory where this index.js file is
// path.join function just append the views to the current directory path
app.set("views", path.join(__dirname, "views"));

// set the path of all my statics file
app.use(express.static("assets"));

// use express routes
app.use("/", require("./routes/index"));

// express is listening on port 8000
app.listen(port, function(err){
    if(err){
        console.log("Error in running the server", err);
        return;
    }

    console.log(`my express server is running on ${port}`);
});


