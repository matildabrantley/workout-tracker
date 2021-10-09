const mongoose = require("mongoose");
const models = require("../../models");
const router = require('express').Router();

//New workout POST request
router.post('/api/workouts', (req, res) => {
  models.Workout.create({})
    .then((db) => {
      res.json(db);
    })
    .catch((error) => {
      res.json(error);
    });
});

//Add exercise to workout PUT request
router.put('/api/workouts/:id', ({ body, params }, res) => {
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
router.get('/api/workouts', (req, res) => {
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

  router.delete('/api/workouts', ({ body }, res) => {
    models.Workout.findByIdAndDelete(body.id)
      .then(() => {
        res.json(true);
      })
      .catch((error) => {
        res.json(error);
      });
  });

module.exports = router;