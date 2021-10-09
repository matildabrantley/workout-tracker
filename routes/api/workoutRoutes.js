const mongoose = require("mongoose");
const models = require("../../models");
const router = require('express').Router();

//New workout POST request
router.post('/workouts', (req, res) => {
  models.Workout.create({})
    .then((db) => {
      res.json(db);
    })
    .catch((error) => {
      res.json(error);
    });
});

//Add exercise to workout PUT request
router.put('/workouts/:id', ({ body, params }, res) => {
    models.Workout.findByIdAndUpdate(
      params.id,
      { $push: { exercises: body } },
      //make sure the exercise being added fits into schema with runValidators 
      { new: true, runValidators: true }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((error) => {
        res.json(error);
      });
  });

//Display exercises and show total duration GET request 
router.get('/workouts', (req, res) => {
    models.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: '$exercises.duration',
          },
        },
      },
    ])
      .then((db) => {
        res.json(db);
      })
      .catch((error) => {
        res.json(error);
      });
  });

  router.delete('/workouts', ({ body }, res) => {
    models.Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch((error) => {
        res.json(error);
      });
  });

  router.get("/range", async (req, res) => {
    const workouts = await models.Workout.aggregate([
      {
        $addFields: {
          totalDuration: {
            $sum: "$exercises.duration",
          },
        },
      },
    ])
      .sort({ day: -1 })
      .limit(7);
    res.send(workouts);
  });

module.exports = router;