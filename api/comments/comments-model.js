const db = require('../data/db-config');

async function findComments(goal_id) {
    const comments = await db('comments as c')
        .join('users as u', 'u.user_id', 'c.user_id')
        .where('c.goal_id', goal_id)
        .select('c.*', 'u.user_username')

    return comments;
}

module.exports = {
    findComments,
}