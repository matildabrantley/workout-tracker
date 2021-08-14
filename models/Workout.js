const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    exercises: [
        {
          name: {
            type: String,
            required: "Must provide name of workout."
          },
          type: {
            type: String,
            required: "Must provide type of workout."
          },
          duration:{
            type: Number,
            require: "Must provide minutes spent working out"
          },
          sets:{
            type: Number,
          },
          weight: {
            type: Number,
          },
          reps:{
            type: Number
          },
          distance:{
            type: Number
          },
        }
        ],
          day: {
            type: Date,
            default: Date.now
          }
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;