const router = require('express').Router();
// const Users = require('../users/users-model');

router.get('/', (req, res, next) => {
    console.log('router wired');
})

module.exports = router;