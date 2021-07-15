const db = require('../data/db-config');

async function goalsByUser(user_id) {
    const goals = await db('goals')
    .where('user_id', user_id);
    return goals;
}

async function goalDetails(goal_id) {
    const goal = await db('goals as g')
    .leftJoin('steps as s', 'g.goal_id', '=', 's.goal_id')
    .select(
        'g.goal_id', 
        'g.user_id', 
        'g.goal_title', 
        'g.percentage_completed', 
        's.step_number', 
        's.step_text', 
        's.step_id',
        's.completed'
    )
    .where('g.goal_id', goal_id);

    return goal;
}

async function addGoal(user_id, newGoal) {
    const { title } = newGoal;
    const [addedGoal] = await db('goals')
        .insert({
            user_id,
            goal_title: title
        },
        [
            'goal_id',
            'user_id',
            'goal_title',
            'percentage_completed'
        ])

    return addedGoal;
}

async function findStep(goal_id, step_number) {
    const [existingStep] = await db('steps')
        .where({
            goal_id,
            step_number
        })
    return existingStep;
}

async function addSteps(goal_id, newSteps) {
    const { step_number, step_text } = newSteps
    const [step] = await db('steps')
        .insert({
            goal_id, 
            step_number,
            step_text
        },
        [
            'step_id',
            'goal_id',
            'step_number',
            'step_text',
            'completed'
        ]
        )
    
    return step;
}

async function editGoal(goal_id, editedGoal) {
    const { title } = editedGoal;
    const [goal] = await db('goals')
        .where('goal_id', goal_id)
        .update({
            goal_title: title
        }, 
        [
            'goal_id',
            'user_id',
            'goal_title',
            'percentage_completed'
        ]);

    return goal;
}

async function editStep(step_id, editedStep) {
    const { step_text, completed } = editedStep;
    const [step] = await db('steps')
        .where('step_id', step_id)
        .update({
            step_text,
            completed
        },
        [
            'step_id',
            'goal_id',
            'step_number',
            'step_text',
            'completed'
        ])

    return step;
}

async function deleteGoal(goal_id) {
    const goal = await db('goals')
        .where('goal_id', goal_id)
        .del([])

    return goal;
}

module.exports = {
    goalsByUser,
    goalDetails,
    findStep,
    addGoal,
    addSteps,
    editGoal,
    editStep,
    deleteGoal,
}
