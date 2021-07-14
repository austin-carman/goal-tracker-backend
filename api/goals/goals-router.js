const router = require('express').Router();
const Goals = require('./goals-model');
const { restricted } = require('../authentication/auth-middleware');
const { 
    validateUserGoals, 
    validateGoalId, 
    validateStepId, 
    validateGoalBody, 
    validateNewStepBody, 
    validateEditStep 
} = require('./goals-middleware');

// All goals for specified user
router.get('/:user_id', restricted, validateUserGoals, (req, res, next) => {
    res.status(200).json(req.goals)
})

// View all details for goal
router.get('/details/:goal_id', restricted, validateGoalId, (req, res, next) => {
    res.status(200).json(req.goal);
})

// Add new goal
router.post('/new/:user_id', restricted, validateGoalBody, (req, res, next) => {
    Goals.addGoal(req.params.user_id, req.body)
        .then(newGoal => {
            res.status(201).json(newGoal)
        })
        .catch(next)
})

// add new step to a goal
router.post('/add-step/:goal_id', restricted, validateGoalId, validateNewStepBody, (req, res, next) => {
    Goals.addSteps(req.params.goal_id, req.body)
        .then(steps => {
            res.status(201).json(steps);
        })
        .catch(next)
})

// edit goal
router.put('/edit/goal/:goal_id', restricted, validateGoalId, validateGoalBody, (req, res, next) => {
    Goals.editGoal(req.params.goal_id, req.body)
        .then(goal => {
            res.status(201).json(goal);
        })
        .catch(next);
})

// edit step
router.put('/edit/step/:step_id', restricted, validateEditStep, validateStepId, (req, res, next) => {
    Goals.editStep(req.params.step_id, req.body)
        .then(step => {
            res.status(201).json(step);
        })
        .catch(next);
})

// delete goal
router.delete('/delete/:goal_id', restricted, validateGoalId, (req, res, next) => {
    Goals.deleteGoal(req.params.goal_id)
        .then(goal => {
            res.status(200).json(goal);
        })
})

module.exports = router;
