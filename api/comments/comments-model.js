const db = require('../data/db-config');

async function findComments(goal_id) {
    const comments = await db('comments as c')
        .join('users as u', 'u.user_id', 'c.user_id')
        .where('c.goal_id', goal_id)
        .select('c.*', 'u.user_username')

    return comments;
}

async function addComment(goal_id, user_id, comment_text) {
    const [newComment] = await db('comments')
        .insert({
            user_id,
            goal_id,
            comment_text
        }, 
        [
            'comment_id',
            'user_id',
            'goal_id',
            'comment_text',
            'created_at'
        ])
    
    return newComment;
}

module.exports = {
    findComments,
    addComment,
}