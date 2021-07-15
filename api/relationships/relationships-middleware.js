const Follow = require('./relationships.model');

const alreadyFollowing = async (req, res, next) => {
    const { user_id, following_id } = req.params;
    try {
        const following = await Follow.isFollowing(user_id, following_id)
        if(!following) {
            next()
        } else {
            res.json({
                status: 400,
                message: `User is already following, ${following.following_username}`
            })
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    alreadyFollowing
}