const db = require('../data/db-config');

async function findLikes(goal_id) {
    const goalLikes = await db('likes as l')
        .join('users as u', 'l.user_id', 'u.user_id')
        .where('goal_id', goal_id)
        .select('l.*', 'u.user_username as username')

    return goalLikes;
}

async function likeGoal(user_id, goal_id) {
    const [likedGoal] = await db('likes as l')
        .insert({
            user_id,
            goal_id
        },
        [
            'like_id',
            'user_id',
            'goal_id',
        ])
    
    return likedGoal;
}

async function removeLike(user_id, goal_id) {
    const remove = await db('likes')
        .where({
            'user_id': user_id,
            'goal_id': goal_id
        })
        .del()

    return remove;
}

module.exports = {
    findLikes,
    likeGoal,
    removeLike
}
