// require the mongoose
const mongoose = require("mongoose");

// connect to the database
mongoose.connect(process.env.DATABASE);

// acquire the connection(to check if it is succesful)
const db = mongoose.connection;

// error
db.on("error", console.log.bind(console, "error connecting to the database"));

// up and running then print message
db.once("open", function(){
    console.log("Successfully connected to the database");
});