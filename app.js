const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const { auth } = require('express-openid-connect');

// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;
const app = express();


app.get('/', (req, res) => {
    res.send('Connection is working');
})

app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'process.env.SECRET',
    baseURL: 'http://localhost:8080',
    clientID: 'process.env.CLIENT_ID',
    issuerBaseURL: 'https://dev-t527q6xrv3ythcah.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
});