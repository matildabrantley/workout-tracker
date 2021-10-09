const router = require("express").Router();
const path = require("path");

//path to exercise.html for adding/completing exercises
router.get("/exercise", (req, res) => { res.sendFile(path.join(__dirname, "../public/exercise.html")); });

//path to stats.html to see charts of last week's workouts
router.get("/stats", (req, res) => { res.sendFile(path.join(__dirname, "../public/stats.html")); });

module.exports = router;
