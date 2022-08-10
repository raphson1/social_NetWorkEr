const { User, Thought, Reaction } = require('../models');

module.exports = {
    getThought(req, res) {
        Thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-_v')
        .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No Thought find!!'})
          : res.json(thought)
        
        )
    }

}