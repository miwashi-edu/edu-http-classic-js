const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userHandler = require('../domain/user_handler.js');

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "a secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "a secret";

exports.register = (req, res) => {
    const { username, password } = req.body;
    hash = passwordToHash(hash);
    let user = {
        name: username,
        password: hash,
        role: 'user'
    }
    user = userHandler.create(user);
    res.status(201).json(user);
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = userHandler.readByName(username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
        { id: user.id, name: user.name },
        ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
        { id: user.id, name: user.name },
        REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax' // Use 'Strict' in production, 'Lax' otherwise
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Secure in production
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax' // Use 'Strict' in production, 'Lax' otherwise
    });

    res.status(200).json({ message: 'Login successful' });
}

async function passwordToHash(password) {
    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        return null;
    }
}
