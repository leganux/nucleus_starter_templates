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

const session = require('express-session');



const { createClient } = require('redis');
const RedisStore = require("connect-redis").default // Import as a class

let redisClient = createClient({
    host: 'localhost' || process.env.REDIS_HOST,
    port: 6379 || process.env.REDIS_PORT
});

redisClient.connect().catch(function (e) {
    console.error(e);
    redisClient = false
})

let sessionMiddleware;

if (redisClient) {
    let redisStore = new RedisStore({
        client: redisClient,
        prefix: "nucleus:",
    })

    sessionMiddleware = session({
        name: process.env.NAME_COOKIE || 'nucleus',
        resave: false,
        saveUninitialized: false,
        store: redisStore,
        secret: process.env.SESSION_SECRET || 'N7Cl3usSecret_',
        cookie: {
            maxAge: 60 * 60 * 24 * 10,
            sameSite: true,
            secure: false
        }
    });
} else {
    sessionMiddleware = session({
        name: process.env.name_cookie || 'nucleus',
        secret: process.env.SESSION_SECRET || 'N7Cl3usSecret_',
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true if using HTTPS
    });
}


app.use(sessionMiddleware);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())



let {sequelize} = require('./config/connection.js')
sequelize.authenticate().then(function () {
    console.log('Connection with DB has been established successfully.');
}).catch(function (error) {
    console.error('Unable to connect to the database:', error);
});


app.use('/cdn', express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

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
app.use('/', require('./views/site.js'))
app.use('/dashboard', require('./views/dashboard.js'))


//CREATE SERVER HTTP
const server = http.createServer(app)

server.listen(process.env.API_PORT | 1111, () => {
    console.log('started at');
    console.log('http://localhost:' + (String(process.env.API_PORT) | '1111'));
});


//CREATE ONE ADMIN IF THERE AREN'T ADMINS
setTimeout(function () {
    require('./helpers/check_admins.helper')
}, 1000)

