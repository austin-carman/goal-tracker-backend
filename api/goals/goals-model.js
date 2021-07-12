const db = require('../data/db-config');

// All goals for specified user
async function goalsByUser(user_id) {
    const goals = await db('goals as g')
    .where('user_id', user_id)

    return goals;
}

// view specified goal's details
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
    .where('g.goal_id', goal_id)

    const steps = goal.map(step=> {
        return {
            step_number: step.step_number,
            step_text: step.step_text,
            completed: step.completed,
        }
    })

    const goalDetails = {
            goal_id: goal[0].goal_id,
            goal_title: goal[0].goal_title,
            percentage_completed: goal[0].percentage_completed,
            steps: steps
    }

    return goalDetails;
}


// Add new goal for specified user
// async function addNewGoal(user_id, newGoal) {
//     const newGoal = await db('goals')
// }



module.exports = {
    goalsByUser,
    goalDetails,
    // addNewGoal,
}