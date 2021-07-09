const db = require('../data/db-config');

function findUserBy(filter) {
    const users = db('users')
        .where(filter)
        .first();
    return users;
}

function findUserById(user_id) {
    const users = db('users')
        .where('user_id', user_id)
        .first();
    return users;
}

async function addUser({ user_username, user_password, user_email }) {
    const newUser = await db.transaction(async trx => {
        const [result] = await trx('users')
        .insert(
            { user_username, user_password, user_email }, 
            ['user_id', 'user_username', 'user_password', 'user_email']
        )
        return result
    })
    return newUser
}

module.exports = {
    findUserBy,
    findUserById,
    addUser,
}
