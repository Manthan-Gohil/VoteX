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


// app.engine(
//     "handlebars", 
//     engine({
//      layoutsDir: path.join(__dirname, "views"),
//      partialsDir: path.join(__dirname, "views"  ),
//      })
//     );

//     app.get('/', (req,res)=>{
//         res.render('main',{
//             pageTitle: 'VoteX - College Election System',
//             content:'VoteX',
//             messageone:"welcome To The",
//             messagetwo:"College Election",
//             messagethree:"Voting System",
//             section_title: "Why Choose Us?", 
//             upper_para: "VoteX is the best voting software due to following reasons",
//             features: [
//                 {
//                     icon: 'https://dymk4s89vutua.cloudfront.net/wp-content/plugins/r2v-api/images/icons/secured.png?x97479',
//                     title: '100% Secure',
//                     description: 'Your vote is confidential and protected with advanced encryption to ensure complete security throughout the process.'
//                 },
//                 {
//                     icon: 'https://dymk4s89vutua.cloudfront.net/wp-content/plugins/r2v-api/images/icons/easy-to-use.png?x97479',
//                     title: 'Easy to Use',
//                     description: 'VoteX election system is very user-friendly and voting can be done anytime and from anywhere within seconds.'
//                 },
//                 {
//                     icon: 'https://dymk4s89vutua.cloudfront.net/wp-content/plugins/r2v-api/images/icons/school.png?x97479',
//                     title: 'Colleges Voting',
//                     description: 'Online election platform for student elections, hostel elections, department elections, polling in classroom.'
//                 }
//             ],
//             "about": {
//                 "title": ["College Election", "Voting System"],
//                 "description": "Welcome to the College Election Voting System, a secure and innovative platform designed to elevate your voting experience. We believe in the power of student voices, and this system is built to ensure that every vote is counted and every opinion matters.",
//                 "socialLinks": [
//                     { "icon": "bx bxl-facebook-circle", "href": "#" },
//                     { "icon": "bx bxl-instagram", "href": "#" },
//                     { "icon": "bx bxl-twitter", "href": "#" }
//                 ]
//             },
//             "contact": {
//                 "heading": ["Get in Touch", "With Us"],
//                 "description": "Feel free to connect with us for any of your needs regarding our services. Our support team is ready to solve any of your issues. Just push a text to us and we will get back to you immediately.",
//                 "address": {
//                     "country": "India",
//                     "location": "Gurugram, Haryana 122",
//                     "email": "support@collegeelectionsystem.com",
//                     "phone": "+91 7354177006"
//                 }
//             }
//         })
//     } )

app.use(authRoutes);
app.use(electionRoutes);

dbConnection();

app.listen(3000,()=>{
    console.log("Server listening to port 3000");
})