const Habit = require("../model/habit");
let firstTime = true;
let view = "Daily";
module.exports.home = async function(req, res){
    try{

        const allHabits = await Habit.find({});
        // console.log(firstTime);
        if(firstTime){
            for(let habit of allHabits){
                let currentDate = new Date();
                if(habit.records[habit.records.length-1].date.getDate() != currentDate.getDate()){
                    habit.records.push({
                        date: currentDate,
                        status: "None"
                    });
                    habit.save();
                }
            }
            firstTime = false;
        }

        // console.log(firstTime);
        // console.log(allHabits);
        return res.render("home", {
            allHabits: allHabits,
            view: view
        });

    }catch(err){
        console.log(err);
        res.redirect("back");
    }
}


module.exports.addHabit = async function(req, res){
    
    try{

        const habit = await Habit.create({
            name: req.body.habit,
            records: []
        });

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date();
            habit.records.unshift(getPreviousDates(currentDate, i));
        }
    
        habit.save();
        // console.log(habit.records);
        return res.redirect("/");

    }catch(err){
        console.log(err);
        return res.redirect("back");
    }
}


module.exports.updateHabitStatus = async function(req, res){
    try{

        const habit = await Habit.findById(req.query.habitId);
        habit.records[habit.records.length-1].status = req.query.status;
        habit.save();

        return res.status(200).json({
            message: "status updated"
        });

    }catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

// delete a habit from DB
module.exports.deleteHabit = async function(req, res){
    try{

        const habit = await Habit.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message: "Habit deleted Successfully"
        });

    }catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

module.exports.updateHabitStatusWeekly = async function(req, res){
    try{
        // console.log(req.query);
        const habit = await Habit.findById(req.query.habitId);
        // console.log(habit.records[habit.records.length - 2].date.toISOString() === req.query.date);
        for(let i = habit.records.length - 1; i >= habit.records.length - 6; i--){
            if(habit.records[i].date.toISOString() === req.query.date){
                habit.records[i].status = req.query.status;
                habit.save();
                break;
            }
        }

        return res.status(200).json({
            message: "status update on specific date is successfull"
        });

    }catch(err){
        console.log(err);
        return res.redirect("back");
    }
}

// change the view (daily OR Weekly)
module.exports.changeView = function(req, res){

    view = view === "Daily" ? "Weekly" : "Daily";
    res.redirect("/");

}


function getPreviousDates(currentDate, i){
    const record = {};
    record.date = currentDate.setDate(currentDate.getDate() - i);
    record.status = "None";

    return record;
}