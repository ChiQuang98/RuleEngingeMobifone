var http = require('http');
let cookieParser = require('cookie-parser');
var RED = require("node-red");
var cors = require('cors')
const fs = require('fs')
var express = require("express");
const session = require('express-session');
var crypto = require('crypto');
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
// // Defining key
// const key = crypto.randomBytes(32);
// // Difining algorithm
// const algorithm = 'aes-256-cbc';
// // Defining iv
// const IV_LENGTH = crypto.randomBytes(16);
// // An encrypt function
const ENCRYPTION_KEY = crypto.randomBytes(32); // Must be 256 bits (32 characters)
const IV_LENGTH = 16; // For AES, this is always 16
function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + '.' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split('.');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join('.'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}
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
app.get('/encrypt/:passtext', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
    var key = 'MobifoneKEY2021';
    var textReq = req.params.passtext;
    var cipher = crypto.createCipher(algorithm, key);
    var encrypted = cipher.update(textReq, 'utf8', 'hex') + cipher.final('hex');
    res.send(encrypted)
});
app.get('/decrypt/:passtext', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("QUANGVIP")
    var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
    var key = 'MobifoneKEY2021';
    var text = req.params.passtext;
    // var encryptTxt = { iv: iv.toString('hex'),
    //     encryptedData: text.toString('hex') }
    var decipher = crypto.createDecipher(algorithm, key);
    var decrypted = decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
    res.send(decrypted)
});
app.get('/getChannelsByUser/:token', (req, res) => {
    var token =  req.params.token;
    console.log("TOKEN: ")
    console.log(token)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // console.log("QTOKEN"+req.session.token)


    var http = require('http');
    const options = {
        hostname: '10.16.150.132',
        port: '8010',
        path: '/api-gw/v1/channel/list-all',
        method: 'GET',
        headers: {
            Authorization: `${token}`
        }
    }
    callback = function(response) {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            var rs = JSON.parse(str)
            // activeFlow = rs;
            // return rs
            // console.log(rs)
            // console.log(rs.errorCode);
            console.log(response.statusCode);
            if (response.statusCode == 200) {
                // console.log("IN QUANGgggggggg")
                // console.log(rs)
                res.send(rs)
            }
            else {
                res.send('Error get List')
                console.log("OUT QUANG")

            }
        });

    }
    var req1 = http.request(options, callback);
    req1.end();
    // res.send(decrypt(text))
});

app.get('/nodered/:token/:flowid', (req, res) => {
    var stringToken = req.params.token.split(" ")[1];
    console.log("TOKENQUANG: "+stringToken)
    res.cookie('TokenUser',stringToken, {
        maxAge: 60*60*60,
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
