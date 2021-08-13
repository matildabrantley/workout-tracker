const router = require('express').Router();
const path = require("path");
const exercisePath = "../public/exercise.html";
const statsPath = "../public/stats.html";

router.get("/exercise", (req, res) => res.sendFile(path.join(__dirname, exercisePath)));
router.get("/stats", (req, res) => res.sendFile(path.join(__dirname, statsPath)));

module.exports = router;