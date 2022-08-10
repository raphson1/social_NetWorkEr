const router = require('express').Router();

const {
    getThought,
    getSingleThought,
    createThougnt,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

router.route('/').get(getThought).post(createThougnt);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route(':thoughtId/reactions').post(createReaction);

router.route('/thoughtzid/reactions/:reactionId').delete(deleteReaction);

module.exports = router;