const express = require("express");
const cors = require("cors");
const session = require('express-session');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

// API
app.use("/api", apiRoutes);

// WEB
app.set('views', __dirname + '/views'); // set views directory
app.set('view engine', 'jsx'); // set view engine
const options = { beautify: true };
app.engine('jsx',
    require('express-react-views').createEngine(options)); // use React on view engine

app.use(express.static("public"));

app.use(session({
    secret: process.env.JWT_KEY,
    resave: true,
    saveUninitialized: true
}));
app.use("/", webRoutes);

app.listen(3000, ()=>console.log("listening at http://localhost:3000"));