const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../secret/index');


module.exports = function (user) {
    const payload = {
        subject: user.user_id,
        username: user.user_username,
    }
    const options = {
        expiresIn: '1d',
    }

    return jwt.sign(
        payload,
        JWT_SECRET,
        options
    )
}