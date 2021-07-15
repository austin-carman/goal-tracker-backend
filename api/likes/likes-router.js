const router = require('express').Router()
const Likes = require('./likes-model');
const { alreadyLiked, validateGoalId } = require('./likes-middleware');

router.get('/:goal_id', validateGoalId, (req, res, next) => {
    Likes.findLikes(req.params.goal_id)
        .then(likes => {
            res.status(200).json(likes)
        })
        .catch(next)
})

router.post('/:user_id/:goal_id', alreadyLiked, (req, res, next) => {
    const { user_id, goal_id } = req.params;
    Likes.likeGoal(user_id, goal_id)
        .then(likedGoal => {
            res.status(200).json(likedGoal);
        })
        .catch(next);
})

router.delete('/remove/:user_id/:goal_id', (req, res, next) => {
    const { user_id, goal_id } = req.params;
    Likes.removeLike(user_id, goal_id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(next)
})

module.exports = router;
