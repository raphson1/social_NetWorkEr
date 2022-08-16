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
        .catch((err) => res.status(500).json(err));
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then(({ _id })  => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id } },
                { new: true }
            );
        })
        .then((thought) => 
          !thought
             ? res.status(404).json({ message: 'No thought find with this Id!!'})
             : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true }
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id:req.params.thoughtId })
            .then((thought) => 
              !thought
                 ? res.status(404).json({ message: "No thought find with this Id!" })
                 : User.findOneAndUpdate(
                    { thought: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                 )
            )
            .then((user) =>
              !user
                ? res.status(404).json({ message: "no user find, thought deleted"})
                : res.json({ message: 'Thought deleted' }) 
            )
            .catch((err) => res.status(500).json(err));

    }

}