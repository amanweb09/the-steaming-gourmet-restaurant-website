const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

//DOTENV
require('dotenv').config();

//SESSION
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60*60*24*2
    },
    store: MongoStore.create({
        mongoUrl: process.env.COMPASS_CONNECTION_STRING
    })
}))

//COOKIE PARSER
app.use(cookieParser());


//CONTROLLERS
const signupController = require('../controllers/auth/signupController');
const loginController = require('../controllers/auth/loginController');


//ROUTING
router.get('/', (req, res) => {
    res.render('guest/index.ejs', {
        title: "PizzaBoy - A Pizza Delivery Website"
    })
})

router.get('/signup', signupController().render);
router.post('/signup', signupController().store);

router.get('/login', loginController().render);
router.post('/login', loginController().access);

module.exports = router