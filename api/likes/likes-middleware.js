const db = require('../data/db-config');
const Likes = require('./likes-model');


const validateGoalId = async (req, res, next) => {
    const { goal_id } = req.params;
    try {
        const goal = await db('goals')
        .where('goal_id', goal_id);
        if (!goal || goal.length === 0) {
            res.json({
                status: 404, 
                message: `Could not find goal with id ${goal_id}`
            })
        } else {
            next()
        }
    }
    catch (err) {
        next(err)
    }
}

const alreadyLiked = async (req, res, next) => {
    const { user_id, goal_id } = req.params;
    try {
        const likes = await Likes.findLikes(goal_id)
        const beenLiked = likes.filter(id => 
            id.user_id == user_id
        )
        if (beenLiked.length === 0) {
            next()
        } else {
            res.json({
                status: 404,
                message: 'User has already liked this goal'
            })
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    alreadyLiked,
    validateGoalId,
}
