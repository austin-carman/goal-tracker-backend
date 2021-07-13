const router = require('express').Router();
const Goals = require('./goals-model');
const { restricted } = require('../authentication/auth-middleware');
const { validateUserId, validateGoalId, validateStepId, validateGoalBody, validateNewStepBody, validateEditStep } = require('./goals-middleware');

// ***** add restricted middleware for all endpoints!!!

// All goals for specified user
router.get('/:user_id', validateUserId, (req, res, next) => {
    res.status(200).json(req.goals)
})

// View all details for goal
// ??? Did I do middleware right? -if so delete commented out block
router.get('/details/:goal_id', validateGoalId, (req, res, next) => {
    // Goals.goalDetails(req.params.goal_id)
    //     .then(goal => {
    //         res.status(200).json(goal);
    //     })
    //     .catch(next);

    res.status(200).json(req.goal);
})

// Add new goal
router.post('/new/:user_id', validateUserId, validateGoalBody, (req, res, next) => {
    Goals.addGoal(req.params.user_id, req.body)
        .then(newGoal => {
            res.status(201).json(newGoal)
        })
        .catch(next)
})

// add new step to a goal
router.post('/add-step/:goal_id', validateGoalId, validateNewStepBody, (req, res, next) => {
    Goals.addSteps(req.params.goal_id, req.body)
        .then(steps => {
            res.status(201).json(steps);
        })
        .catch(next)
})

// edit goal
router.put('/edit/goal/:goal_id', validateGoalId, validateGoalBody, (req, res, next) => {
    Goals.editGoal(req.params.goal_id, req.body)
        .then(goal => {
            res.status(201).json(goal);
        })
        .catch(next);
})

// edit step
router.put('/edit/step/:step_id', validateEditStep, validateStepId, (req, res, next) => {
    Goals.editStep(req.params.step_id, req.body)
        .then(step => {
            res.status(201).json(step);
        })
        .catch(next);

    // res.status(200).json(req.step);
})

// delete goal
router.delete('/delete/:goal_id' ,validateGoalId, (req, res, next) => {
    Goals.deleteGoal(req.params.goal_id)
        .then(goal => {
            res.status(200).json(goal);
        })
})

module.exports = router;
