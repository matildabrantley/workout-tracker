const router = require('express').Router();

router.use( "/workouts", require("./workoutRoutes"));

module.exports = router;