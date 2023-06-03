const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const authRoutes = require('./routes/auth');

// eslint-disable-next-line no-undef
const port = process.env.PORT || 8080;
const app = express();


app.get('/', (req, res) => {
    res.send('Connection is working');
})

app.use('/auth', authRoutes);

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