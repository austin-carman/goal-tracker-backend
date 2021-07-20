const router = require('express').Router();
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');
const { 
    validateBody, 
    checkUsernameFree, 
    checkUsernameExists,
} = require('./auth-middleware');

router.post('/register', validateBody, checkUsernameFree, (req, res, next) => {
        const { user_username, user_password } = req.body;
        const hash = bcrypt.hashSync(user_password, 8);
        Users.addUser({ user_username, user_password: hash })
        .then(newUser => {
            res.status(201).json(newUser);
        })
        .catch(next);
    }
);

router.post('/login', validateBody, checkUsernameExists, (req, res, next) => { // is this line too long??
    console.log('check1');
    if (bcrypt.compareSync(req.body.user_password, req.user.user_password)) {
        console.log('check2');
        const token = tokenBuilder(req.user)
        res.status(200).json({
        message: `Welcome back ${req.user.user_username}!`,
        token
    })
    } else {
        console.log('check3');
        next({ 
            status: 401, 
            message: 'Invalid username or password' 
        })
    }
});

module.exports = router;
