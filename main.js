var http = require('http');

var RED = require("node-red");
var cors = require('cors')
const fs = require('fs')
var express = require("express");
const session = require('express-session');

var livereload  = require("connect-livereload");
// Create an Express app
var app = express();
//session
app.use(cors())
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
    // console.log(req.params.token)
    // console.log(req.params.flowid)
    req.session.token = req.params.token;
    req.session.flowid = req.params.flowid;
    req.session.save()
    console.log(" get "+ req.sessionID)

    req.session.save(function(err) {
        // session saved
       return res.redirect('/red');
    })

});
app.post('/nodered', (req, res) => {
    // console.log(req.header.Authorization)
    console.log(req.get('authorization'))
    req.session.token = req.get('authorization');
    res.redirect('/red');
    // /Qua

});
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

server.listen(8000,"0.0.0.0");

RED.start();
