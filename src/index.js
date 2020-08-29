const express = require("express");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Objects
const app = express();

// Database
mongoose.connect("mongodb://localhost/slicklearn", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("database connected succefully");
}).catch((e) => {
    console.error(e);
})

// Settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Static files
app.use("/assets", express.static(path.join(__dirname, "static")));

// Routes
app.use(require("./routes/api_courses.routes"));
app.use(require("./routes/api_login.routes"));
app.use(require("./routes/login.routes"));
app.use(require("./routes/main.routes"));

// Listen
app.listen(80, () => {
    console.log("app listening on port 80");
})