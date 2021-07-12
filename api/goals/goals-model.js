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
async function addGoal(user_id, addGoal) {
    const { title, stepsList } = addGoal; // ??? how to insert steps into steps table?
    const newGoal = await db
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
        .into('goals')
        // .insert(
        //     stepsList.map(step => {
        //         return {
        //             step_number: step.step_number,
        //             step_text: step.step_text
        //         }
        //     }), 
        //     [
        //         'step_number',
        //         'step_text',
        //         'completed'
        //     ]
        // )
        // .into('steps')

    return newGoal;
}



module.exports = {
    goalsByUser,
    goalDetails,
    addGoal,
}
