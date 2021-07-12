const router = require('express').Router();
const Goals = require('./goals-model');
// const { restricted } = require('../authentication/auth-middleware');

// All goals for specified user
router.get('/:user_id', (req, res, next) => {
    Goals.goalsByUser(req.params.user_id)
        .then(goals => {
            res.status(200).json(goals);
        })
        .catch(next);
})

// View a goal's details
router.get('/details/:goal_id', (req, res, next) => {
    Goals.goalDetails(req.params.goal_id)
        .then(goal => {
            res.status(200).json(goal);
        })
        .catch(next);
})

// Add new goal
router.post('/new-goal/:user_id', (req, res, next) => {
    Goals.addGoal(req.body)
        .then(newGoal => {
            res.status(201).json(newGoal)
        })
        .catch(next)
})



module.exports = router;