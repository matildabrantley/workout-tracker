const mongoose = require("mongoose");
const models = require("../../models");
const router = require('express').Router();

//New workout POST request
router.post('/api/workouts/', (req, res) => {
    console.log(req.body)
        models.Workout.create(req.body)
          .then((db) => res.json(db))
          .catch(err => res.status(400).json(err));
});

