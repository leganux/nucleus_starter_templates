try {
    require('dotenv').config()
} catch (e) {
}

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const morgan = require('morgan')
const path = require('path')

const http = require('http');
const tresComas = require("tres-comas");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())


let {mongoose} = require('./config/db.js')
const AWSConf = require('./config/aws.config')

app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))


app.use('/auth', require('./modules/auth/routes.auth'))
app.use('/api', require('./modules/_api.routes'))

let optionsUploadImages = {

    api_base_uri: '/api/files/',
    activeLogRequest: true,
    active_cors: true,
    collection_name: "multimedias",
    public_folder: "archive",
    path_folder: "files",
    allow_public: true,
    limits: {
        fileSize: Infinity,
        filesArray: 10
    },
    structure_folder: "date",
    custom_folder_name: false,
    engine: "aws-s3",
    app: app,
    mongoose,
    connect: AWSConf,
}
let files = new tresComas(process.env.URL_SERVER, false, optionsUploadImages)
files.initialize()

app.all('/', function (req, res) {
    res.status(200).json({
        message: 'Nucleus ok',
        status: 200,
        success: true,
        data: [],
        error: false
    })
})
app.all('/*', function (req, res) {
    res.status(404).json({
        message: 'Not found',
        status: 404,
        success: true,
        data: [],
        error: 'Not found'
    })
})


//CREATE SERVER HTTP
const server = http.createServer(app)

server.listen(process.env.API_PORT | 1111, () => {
    console.log('started at');
    console.log('http://localhost:' + (String(process.env.API_PORT) | '1111'));
});


//CREATE ONE ADMIN IF THERE AREN'T ADMINS
require('./helpers/check_admins.helper')
