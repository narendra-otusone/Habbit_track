const mongoose = require("mongoose");

// creating the schema for habit
const habitSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    records:[
        {
           date:{
               type: Date,
               required: true  
           },
           status: {
               type: String,
               enum: ["Done", "notDone", "None"],
               required: true
           }
        }
    ]
}, {
    timestamps: true
});

// create the model of this schema
const Habit = mongoose.model("Habit", habitSchema);

module.exports = Habit;