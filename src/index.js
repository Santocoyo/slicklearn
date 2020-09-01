import express from 'express';
import path from 'path';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

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

// API Routes
app.use(require("./api/api_courses.routes"));
app.use(require("./api/api_login.routes"));

// Routes
app.use(require("./routes/login.routes"));
app.use(require("./routes/admin.routes"));
app.use(require("./routes/main.routes"));

// Listen
app.listen(8080, () => {
    console.log("app listening on port 8080");
})