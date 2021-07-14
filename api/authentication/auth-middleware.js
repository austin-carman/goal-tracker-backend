const Users = require('../users/users-model');
const { JWT_SECRET } = require('../../secret/index');
const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Invalid token' })
            } else {
                req.decodedJwt = decoded;
                next()
            }
        })
    } else {
        res.status(401).json({ message: 'Token required' });
    }
}

const validateBody = (req, res, next) => {
    const { user_username, user_password } = req.body;
    if (!user_username || !user_password) {
        next({
            status: 400,
            message: 'Username and password are required'
        })
    } else if (user_username.length < 3 || user_password < 3) {
        next({
            status: 400,
            message: 
                'Username and password must be 3 or more characters'
        })
    } else {
        next()
    }
}

const checkUsernameFree = async (req, res, next) => {
    const { user_username } = req.body;
    const user = await Users.findUserBy({user_username})
    if (!user) {
        next()
    } else {
        next({
            status: 422,
            message: `Username, ${user_username}, is already taken`
        })
    }
}

const checkUsernameExists = async (req, res, next) => {
    const { user_username } = req.body;
    try {
        const user = await Users.findUserBy({user_username})
        if (!user) {
            next({
                status: 401,
                message: `Invalid username or password`
            })
        } else {
            req.user = user
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    validateBody,
    checkUsernameFree,
    checkUsernameExists,
    restricted,
}
