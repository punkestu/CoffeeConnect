const express = require("express");
const cors = require("cors");

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authAPI = require("./api/auth");

app.use("/auth", authAPI);

app.listen(3000, ()=>console.log("listening at http://localhost:3000"));