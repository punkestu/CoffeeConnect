const express = require("express");
const cors = require("cors");
const session = require('express-session');

const db = require("./prisma/db");
db.$queryRaw`SELECT 1 FROM user;`.then(
    _=>console.log("DB running successfully"),
    err=>console.log(err)
)

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
if (process.env.NODE_ENV === "development") {
    console.log(process.env.NODE_ENV);
    const logger = require("morgan");
    app.use(logger("dev"));
}

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");

// API
app.use("/api", apiRoutes);

// WEB
const {engine} = require("express-handlebars");
app.engine("hbs", engine({
    extname: "hbs",
    partialsDir: ["./views/layouts", "./views/components"],
    helpers: require("./src/hbsHelper")
}));
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.static("public"));
app.use("/flowbite", express.static(__dirname + "/node_modules/flowbite/dist/"));
app.use("/picture", express.static(__dirname + "/storage/"));

app.use(session({
    secret: process.env.JWT_KEY,
    resave: true,
    saveUninitialized: true
}));

app.use("/", webRoutes);

const _ = app.listen(3000, () => console.log("listening at http://localhost:3000"));