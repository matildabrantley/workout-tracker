const router = require('express').Router();
const models = require('../models');

//New workout POST request
router.post('/api/workouts', (req, res) => {
  models.Workout.create({})
    .then((data) => {
      res.json(data);
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
    .then((data) => {
      res.json(data);
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
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

//Display exercises in a one week range GET request
router.get('/api/workouts/range', (req, res) => {
  models.Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7) //limit to one week of workouts
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json(error);
    });
});

//Remove workout from database DELETE request
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
