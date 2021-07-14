const db = require('../data/db-config');
const Comments = require('./comments-model');

// validate goal_id .... reuse existing goals middleware

// validate user_id .... reuse existing users middleware

const validateCommentId = async (req, res, next) => {
    const { comment_id } = req.params;
    try {
        const [comment] = await db('comments')
            .where('comment_id', comment_id)
        console.log(comment);
        if (!comment) {
            res.json({
                status: 404,
                message: `Could not find comment with id ${comment_id}`
            })
        } else {
            next()
        }
    }
    catch (err) {
        next(err)
    }
}


module.exports = {
    validateCommentId,
}