const express = require('express');
const app = express();
const envVars = require('../config/envVar');
const path = require('path');


//PORT CONFIG
const PORT = envVars().PORT


//PATHS
const views_path = path.join(__dirname, '../views');
const static_path = path.join(__dirname, '../public');


//TEMPLATE ENGINE CONFIG
app.set('view engine', 'ejs');
app.set('views', views_path);


//STATIC FILES CONFIG / MIDDLEWARE
app.use(express.static(static_path));


//BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


//DATABASE
require('./db/connection')();

//ROUTES
app.use(require('./routes/web'));


//SERVER LISTENING
app.listen(PORT, () => {
    console.log(`server established on ${PORT}`)
})