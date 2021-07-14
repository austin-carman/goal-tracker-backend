const db = require('../data/db-config');

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

const validateBody = (req, res, next) => {
    const { comment_text } = req.body;
    console.log('comment', comment_text);
    if (!comment_text) {
        res.json({
            status: 404,
            message: 'Must provide comment_text in body'
        })
    } else {
        next()
    }
}


module.exports = {
    validateCommentId,
    validateBody,
}
