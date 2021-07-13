const router = require('express').Router();
const Goals = require('./goals-model');
// const { restricted } = require('../authentication/auth-middleware');
const { validateNewGoalBody, validateNewStepBody } = require('./goals-middleware');

// All goals for specified user
router.get('/:user_id', (req, res, next) => {
    Goals.goalsByUser(req.params.user_id)
        .then(goals => {
            res.status(200).json(goals);
        })
        .catch(next);
})

// View all details for goal
// middleware for goal_id???
router.get('/:goal_id/details', (req, res, next) => {
    Goals.goalDetails(req.params.goal_id)
        .then(goal => {
            res.status(200).json(goal);
        })
        .catch(next);
    // res.status(200).json(req.goal);
})

// Add new goal
router.post('/new-goal/:user_id', validateNewGoalBody, (req, res, next) => {
    Goals.addGoal(req.params.user_id, req.body)
        .then(newGoal => {
            res.status(201).json(newGoal)
        })
        .catch(next)
})

// add new step to a goal
// middleware for goal_id??
router.post('/:goal_id/steps', validateNewStepBody, (req, res, next) => {
    Goals.addSteps(req.params.goal_id, req.body)
        .then(steps => {
            res.status(201).json(steps);
        })
        .catch(next)
})

// edit goal
// middleware for edited goal
router.put('/:goal_id/edit', (req, res, next) => {
    Goals.editGoal(req.params.goal_id, req.body)
        .then(goal => {
            res.status(201).json(goal);
        })
        .catch(next);
})

// edit step
// middleware for edited step
router.put('/steps/:step_id/edit', (req, res, next) => {
    Goals.editStep(req.params.step_id, req.body)
        .then(step => {
            res.status(201).json(step);
        })
        .catch(next);
})

// delete goal
// middleware for goal_id
router.delete('/:goal_id', (req, res, next) => {
    Goals.deleteGoal(req.params.goal_id)
        .then(goal => {
            res.status(200).json(goal);
        })
})

module.exports = router;
