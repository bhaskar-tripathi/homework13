const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({

  day: Number,
  totalDuration: {
    type: Number,
    default: 0
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Workout type is Required"
      },
      name: {
        type: String,
        trim: true,
        required: "Workout type is Required"
      },
      duration: Number,
      distance: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
