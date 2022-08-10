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

