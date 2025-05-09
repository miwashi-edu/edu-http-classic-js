const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken; // Assume the cookie name is 'accessToken'

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

exports.verifyAdmin = (req, res, next) => {
    const token = req.cookies.accessToken; // Assume the cookie name is 'accessToken'

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }

            if (user.role === "admin") {
                req.user = user;
                next();
            } else {
                res.sendStatus(403); // Forbidden
            }
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

