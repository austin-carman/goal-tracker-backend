const db = require('../data/db-config');
const Users = require('./goals-model');

// const validateGoalId = (req, res, next) => {

// }

const validateNewGoalBody = (req, res, next) => {
    const { title } = req.body;
    if (!title) {
        res.json({
            status: 404,
            message: 'Title is required'
        })
    } else {
        next()
    }
}

const validateNewStepBody = (req, res, next) => {
    const { step_number, step_text } = req.body;
    if (!step_number || !step_text) {
        res.json({
            status: 404,
            message: 'Step number and description are required'
        })
    } else {
        next()
    }
}

module.exports = {
    validateNewGoalBody,
    validateNewStepBody,
}
