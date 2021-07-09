const users = [
    {
        user_username: 'abc12',
        user_password: '1234', // need to change to hash
        user_email: 'abcarman12@gmail.com'
    },
    {
        user_username: 'samantha',
        user_password: '1234', // need to change to hash
        user_email: 'sillysammy6@gmail.com'
    }
]

const goals = [
    {
        user_id: 1,
        goal_title: 'Read 5 books',
        achieve_by: '12/31/2021'
    },
    {
        user_id: 1,
        goal_title: 'Save enough for a house down payment',
        achieve_by: '12/31/2023'
    },
    {
        user_id: 2,
        goal_title: 'Organize the closet',
        achieve_by: '08/28/2021'
    },
    {
        user_id: 2,
        goal_title: 'Find a job I enjoy',
        achieve_by: '09/01/2021'
    }
]

const steps = [
    {
        goal_id: 1,
        step_number: 1,
        step_text: 'Pick 5 books to read'
    },
    {
        goal_id: 1,
        step_number: 2,
        step_text: 'Read 30 minutes everyday'
    },
    {
        goal_id: 2,
        step_number: 1,
        step_text: 'Find a job'
    },
    {
        goal_id: 2,
        step_number: 2,
        step_text: 'Set up automatic transfer 20% of paycheck to savings acct'
    },
    {
        goal_id: 2,
        step_number: 3,
        step_text: 'Start a side hustle to make extra income'
    },
    {
        goal_id: 3,
        step_number: 1,
        step_text: 'Donate old clothes, sort clothes'
    },
    {
        goal_id: 4,
        step_number: 1,
        step_text: 'Apply to 5 jobs this week'
    },
]

const likes = [
    {
        user_id: 2,
        goal_id: 1,
    },
    {
        user_id: 1,
        goal_id: 3
    }
]

const comments = [
    {
        user_id: 2,
        goal_id: 1,
        comment_text: 'You should read Unbroken! So good!'
    },
    {
        user_id: 1,
        goal_id: 1,
        comment_text: 
            `Oh great suggestion! 
            I've been wanting to read that`
    }
]

const relationships = [
    {
        follower_id: 2,
        following_id: 1
    }
]

exports.seed = async function (knex) {
    await knex('users').insert(users)
    await knex('goals').insert(goals)
    await knex('steps').insert(steps)
    await knex('likes').insert(likes)
    await knex('comments').insert(comments)
    await knex('relationships').insert(relationships)
};

