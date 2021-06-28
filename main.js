var http = require('http');
var express = require("express");
var RED = require("node-red");
const fs = require('fs')
const session = require('express-session');
// Create an Express app
var app = express();
//session
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'somesecret',
    cookie: { maxAge: 6000000 }}));
// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { } ,
    // storageModule : require("node-red-mongo-storage-plugin"),
    // storageModuleOptions: {
    //     mongoUrl: 'mongodb://192.168.245.128:27017',
    //     //also possible
    //     //mongoUrl: 'PROCESS.ENV.MONGOURL',
    //     database: 'local',
    //     //optional
    //     //set the collection name that the module would be using
    //     collectionNames:{
    //         flows: "nodered-flows",
    //         credentials: "nodered-credentials",
    //         settings: "nodered-settings",
    //         sessions: "nodered-sessions"
    //     }
    // },// enables global context
};
// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

app.get('/nodered/:token/:flowid', (req, res) => {
    // console.log(req.params.token)
    // console.log(req.params.flowid)
    req.session.token = req.params.token;
    req.session.flowid = req.params.flowid;
    res.redirect('/red');
});
app.post('/nodered', (req, res) => {
    // console.log(req.header.Authorization)
    console.log(req.get('authorization'))
    req.session.token = req.get('authorization');
    res.redirect('/red');

});
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.post('/form', (req, res) => {
//     console.log("SSs")
//     var username = req.body.uname;
//     var password = req.body.psw;
//     if (username==='admin'&&password==='admin'){
//         req.session.user = "admin";
//         console.log("main"+req.session.id)
//
//
//         res.redirect('/red');
//     }
//     else {
//         res.redirect('/');
//     }
// });
server.listen(8000,"0.0.0.0");

// Start the runtime
RED.start();
