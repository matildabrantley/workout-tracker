const express = require("express");
const mongoose = require("mongoose");
//const routes = require('./routes');
const morgan = require("morgan"); //saw this in json file, I think this is necessary middleware

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout");

//entry-point for routes
//app.use(routes);
app.use(require('./routes/workoutRoutes.js'));
app.use(require('./routes/htmlRoutes.js'));

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}!`);
});
