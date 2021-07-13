const db = require('../data/db-config');
const Goals = require('./goals-model');


// ??? should I use db here or Goals.goalsByUser ???
const validateUserId = async (req, res, next) => {
    const { user_id } = req.params;
    try {
        const goals = await db('goals')
        .where('user_id', user_id);

        if (!goals || goals.length === 0) {
            res.json({
                status: 404,
                message: `Could not find user of id ${user_id}`
            })
        } else {
            req.goals = goals;
            next()
        }
    } 
    catch (err) {
        next(err)
    }
}


// ??? is this how you should do the middleware????
const validateGoalId = async (req, res, next) => {
    const { goal_id } = req.params;
    try {
        const goal = await Goals.goalDetails(goal_id)

        if (!goal || goal.length === 0) {
            res.json({
                status: 404,
                message: `Could not find goal with id ${goal_id}`
            })
        } else {
            const steps = goal.map(step=> {
                return {
                    step_number: step.step_number,
                    step_text: step.step_text,
                    completed: step.completed,
                    step_id: step.step_id
                }
            });

            const goalDetails = {
                goal_id: goal[0].goal_id,
                goal_title: goal[0].goal_title,
                percentage_completed: goal[0].percentage_completed,
                steps: steps
            };
            req.goal = goalDetails;
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

const validateStepId = async (req, res, next) => {
    const { step_id } = req.params;
    try {
        const step = await Goals.editStep(step_id, req.body)
        if (!step) {
            res.json({
                status: 404,
                message: `Could not find step with id ${step_id}`
            })
        } else {
            req.step = step;
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

const validateGoalBody = (req, res, next) => {
    const { title } = req.body;
    if (!title) {
        res.json({
            status: 404,
            message: 'Goal Title is required'
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
            message: 'Step number and text are required'
        })
    } else if (isNaN(step_number)) {
        res.json({
            status: 404,
            message: 'Step number must be a number'
        })
    } else {
        next()
    }
}

const validateEditStep = (req, res, next) => {
    const { step_number, step_text, completed } = req.body;
    
    if (!step_number && !step_text && !completed) {
        res.json({
            status: 404,
            message: 'Step number, step description or completion needed to update step'
        })
    } else {
        next()
    }
}

module.exports = {
    validateUserId,
    validateGoalId,
    validateStepId,
    validateGoalBody,
    validateNewStepBody,
    validateEditStep,
}
