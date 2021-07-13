const db = require('../data/db-config');

// All goals for specified user
async function goalsByUser(user_id) {
    const goals = await db('goals as g')
    .where('user_id', user_id);

    return goals;
}

// view a goal's details
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

    return goalDetails;
}


// Add new goal
async function addGoal(user_id, newGoal) {
    const { title } = newGoal; // ??? how to insert steps into steps table?
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
        ]
        )

    return addedGoal;
}

// add new step to a goal
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

// edit goal
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

// edit step
async function editStep(step_id, editedStep) {
    const { step_number, step_text, completed } = editedStep;
    const [step] = await db('steps')
        .where('step_id', step_id)
        .update({
            step_number,
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

// delete goal
async function deleteGoal(goal_id) {
    const goal = await db('goals')
        .where('goal_id', goal_id)
        .del([])

    return goal;
}

module.exports = {
    goalsByUser,
    goalDetails,
    addGoal,
    addSteps,
    editGoal,
    editStep,
    deleteGoal,
}
