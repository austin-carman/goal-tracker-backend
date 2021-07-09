const db = require('../data/db-config');

function findUsers() {
    const users = db('users');
    return users;
}

module.exports = {
    findUsers
}
