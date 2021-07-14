const router = require('express').Router();
const Comments = require('./comments-model');
const { validateCommentId } = require('./comments.middleware');

router.get('/:goal_id', (req, res, next) => {
    Comments.findComments(req.params.goal_id)
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(next);
})

router.post('/:goal_id/add/:user_id', (req, res, next) => {
    const { goal_id, user_id } = req.params;
    const { comment_text } = req.body;
    Comments.addComment(goal_id, user_id, comment_text)
        .then(comment => {
            res.status(200).json(comment);
        })
        .catch(next);
})

router.put('/:user_id/edit/:comment_id', validateCommentId, (req, res, next) => {
    const { user_id, comment_id } = req.params;
    const { comment_text } = req.body;
    Comments.editComment(user_id, comment_id, comment_text)
        .then(editedComment => {
            res.status(201).json(editedComment);
        })
        .catch(next);
})

router.delete('/:comment_id/remove/:user_id', (req, res, next) => {
    const { comment_id, user_id } = req.params;
    Comments.deleteComment(comment_id, user_id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(next)
})

module.exports = router;