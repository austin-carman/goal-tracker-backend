const router = require('express').Router();
const Comments = require('./comments-model');

router.get('/:goal_id', (req, res, next) => {
    Comments.findComments(req.params.goal_id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(next)
})

router.post('/:goal_id/add/:user_id', (req, res, next) => {
    const { goal_id, user_id } = req.params;
    const { comment_text } = req.body;
    Comments.addComment(goal_id, user_id, comment_text)
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(next)
})

module.exports = router;