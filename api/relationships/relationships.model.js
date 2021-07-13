const db = require('../data/db-config');

async function findFollowing(user_id) {
    const following = await db('relationships as r')
        .join('users as u', 'r.following_id', 'u.user_id')
        .select('r.*', 'u.user_username as following_username')
        .where('r.user_id', user_id);
    return following;
}

async function addFollowing(user_id, following_id) {
    const follow = await db('relationships as r')
        .insert({
            user_id,
            following_id
        },
        [
            'relationship_id',
            'user_id',
            'following_id'
        ])
    
    return follow;
}

module.exports = {
    findFollowing,
    addFollowing
}
