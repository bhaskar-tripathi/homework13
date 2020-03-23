const db = require("../models");
const moment = require("moment")

module.exports = function (app) {
  app.get("/api/workouts", function (req, res) {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }),
    app.put("/api/workouts/:id", function (req, res) {
      console.log(req.body);
      db.Workout.findByIdAndUpdate(req.params.id, {
        $inc: { totalDuration: req.body.duration },
        $push: { exercises: req.body }
      })
        .then(dbWorkout => {
          console.log(dbWorkout);
          res.json(dbWorkout);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    }),
    app.post("/api/workouts", function (req, res) {
      db.Workout.create({ day: new Date().setDate(new Date().getDate()) })
        .then(dbWorkout => {
          console.log(dbWorkout);
          res.json(dbWorkout);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    }),
    app.get("/api/workouts/range", function (req, res) {
      var somedateStart = moment({ hour: 0, minute: 00, seconds: 00, milliseconds: 000 });
      var somedateEnd = moment({ hour: 23, minute: 59, seconds: 59, milliseconds: 999 });
      var sunday = moment(somedateStart).day(0).valueOf().toFixed(1);
      var saturday = moment(somedateEnd).day(6).valueOf().toFixed(1);
      db.Workout.find({ day: { $gte: sunday, $lte: saturday }})
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    })
};
