const router = require('express').Router()
const Follow = require('./relationships.model');

router.get('/:user_id', (req, res, next) => {
    Follow.findFollowing(req.params.user_id)
        .then(following => {
            res.status(200).json(following)
        })
        .catch(next)
})

router.post('/:user_id/follow/:following_id', (req, res, next) => {
    Follow.addFollowing(req.params.user_id, req.params.following_id)
        .then(following => {
            res.status(200).json(following)
        })
        .catch(next)
})

module.exports = router;