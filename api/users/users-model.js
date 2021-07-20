const db = require('../data/db-config');

async function findAllUsers() {
    const users = await db('users')
    
    return users;
}

async function findUserBy(filter) {
    const users = await db('users')
        .where(filter)
        .first();
    return users;
}

async function findUserById(user_id) {
    const users = await db('users')
        .where('user_id', user_id)
        .first();
    return users;
}

async function addUser({ user_username, user_password }) {
    const newUser = await db.transaction(async trx => {
        const [result] = await trx('users')
        .insert(
            { user_username, user_password }, 
            ['user_id', 'user_username', 'user_password']
        )
        return result
    })
    return newUser
}

module.exports = {
    findAllUsers,
    findUserBy,
    findUserById,
    addUser,
}
