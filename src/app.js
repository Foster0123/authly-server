require("dotenv").config();
// Common Core Modules
const path 	  = require('path');

// External Modules/Dependencies
const express = require('express');
const { Client } = require("pg");

const app = express();

// Database Connection
const db = require('./app/db/db.js');

// Routes Imports
const homeRoute = require("./app/routes/homeRoute.js");
const loginRoute = require("./app/routes/loginRoute.js");
const signupRoute = require("./app/routes/signupRoute.js");



app.set("view engine", "pug");
app.set("views", path.join(__dirname, process.env.VIEWS_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, process.env.STATIC_DIR)));
app.use((req, res, next) => {
    console.log(`Method:${req.method} | Url:${req.url}`);
    next();
})
app.get("/", homeRoute);
app.get("/login", loginRoute);
app.get("/signup", signupRoute);

app.listen(process.env.APP_PORT, () => {
    db();
    console.log(`Server Running On ${process.env.APP_URL}:${process.env.APP_PORT}`);
})