const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');
const {engine} = require('express-handlebars');

require('dotenv').config();

// database
const {config} = require('dotenv');
const dbConnection = require('./database/dbConnection');
config({path: "./config/config.env"});

// routes
const authRoutes = require('./routes/auth');
const electionRoutes = require('./routes/election');

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
// app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));


app.use(authRoutes);
app.use(electionRoutes);

dbConnection();

app.listen(3000,()=>{
    console.log("Server listening to port 3000");
})