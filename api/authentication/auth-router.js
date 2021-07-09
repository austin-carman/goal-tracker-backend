const router = require('express').Router();
const Users = require('../users/users-model');

router.post('/register', (req, res, next) => {
    const { user_username, user_password, user_email } = req.body;
    Users.addUser({ user_username, user_password, user_email })
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(next);
});

module.exports = router;
