const router = require('express').Router();
const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');
const { validateBody, checkUsernameFree, checkUsernameExists, restricted } = require('./auth-middleware');

router.post('/register', validateBody, checkUsernameFree, (req, res, next) => {
    const { user_username, user_password, user_email } = req.body;
    const hash = bcrypt.hashSync(user_password, 9);

    Users.addUser({ user_username, user_password: hash, user_email })
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(next);
});

router.post('/login', validateBody, checkUsernameExists, (req, res, next) => {
    console.log('reached login');
    if (bcrypt.compareSync(req.body.user_password, req.user.user_password)) {
        const token = tokenBuilder(req.user)
        res.status(200).json({
        message: `Welcome back, ${req.user.user_username}`,
        token, // this token is being returned here just fine
    })
    } else {
        next({ status: 401, message: 'Invalid username or password' })
    }
})

module.exports = router;
