const router = require('express').Router();
const Comments = require('./comments-model');

router.get('/:goal_id', (req, res, next) => {
    Comments.findComments(req.params.goal_id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(next)
})

module.exports = router;