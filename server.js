const express = require('express');
const app = express();
app.use(express.json());

app.use(express.static('public'))
app.use('/api/user', require('./routes/user_routes.js'));

module.exports = app;