// Importation du package dotenv
const dotenv = require('dotenv').config();

// Importation du package express-session
const expressSession = require('express-session');

// Middleware gestion des cookies
const session = {
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie:{path: '/', httpOnly: true, secure: true, maxAge: 600000, sameSite: 'strict'}
};

module.exports = expressSession(session);
