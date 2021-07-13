var http = require('http');
let cookieParser = require('cookie-parser');
var RED = require("node-red");
var cors = require('cors')
const fs = require('fs')
var express = require("express");
const session = require('express-session');

var livereload  = require("connect-livereload");
// Create an Express app
var app = express();
app.use(cookieParser());
//JSON object to be added to cookie
let users = {
    name : "Ritik",
    Age : "18"
}
//Route for adding cookie
app.get('/setuser', (req, res)=>{
    res.cookie("userData", users);
    res.send('user data added to cookie');
});
//Iterate users data from cookie
app.get('/getuser', (req, res)=>{
//shows all the cookies
    res.send(req.cookies);
});

//session
// app.use(cors())
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'somesecret',
    cookie: {
        maxAge: 365 * 24 * 60 * 60 * 1000
    }
})
);

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));
app.enable('trust proxy');
// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { } ,
    httpNodeCors: {
        origin: "*",
        methods: "GET,PUT,POST,DELETE,OPTIONS",
        preflightContinue: true
    },
};
// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);
app.use(livereload())
app.get('/nodered/:token/:flowid', (req, res) => {
    users.Age = 12;
    users.name = req.params.token;
    var stringToken = req.params.token.split(" ")[1];
    res.cookie('TokenUser', stringToken, {
        maxAge: 60*60*1000*24,
        httpOnly: false
    })
    // res.send('user data added to cookie');
    req.session.token = req.params.token;
    req.session.flowid = req.params.flowid;
    req.session.save(function(err) {
        // session saved
       return res.redirect('/red')
    })

});
app.post('/nodered', (req, res) => {
    // console.log(req.header.Authorization)
    console.log(req.get('authorization'))
    req.session.token = req.get('authorization');
    res.redirect('/red?a=1');
    // /Qua

});
// Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
// app.use(express.json());

server.listen(8000,"0.0.0.0");

RED.start();
