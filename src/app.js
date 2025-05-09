const express = require('express');
const app = express();
app.use(express.json());

app.use('/api/user', require('./routes/user_routes.js'));
app.use('/auth', require('./routes/auth_routes.js'));
app.use('/protected', require('./routes/protected_routes'));

module.exports = app;