const { User, Thought, Reaction } = require('../models');

module.exports = {
    getUser(req, res) {
        User.find({}).then((user) => res.json(user))
        // .catch((err) => res.status(500).json(err))
    },

    getSingleUser(req, res) {
        User.findOne({_id: req.params.userId })
        .populate('thoughts').populate('friends')
        .select('-_v')
        .then((user) => 
           !user
              ? res.status(404).json({ message: 'No user find with this id'})
              :res.json(user)
        )
        .catch((err) => res.status(500).json(err));

    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
        return res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
               !user
                 ? res.status(404).json({ message: 'No user find with this id'})
                 : res.json(user)
            )
            .catch((err) => res.status(500).json(err))
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
          .then((user) => 
            !user
              ? res.status(404).json({ message: 'No User Find with this ID!' })
              : Thought .deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and Thought deleted!' }))
          .catch((err) => res.status(500).json(err))
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, New: true }
        )
            .then((user) => 
              !user
                ? res.status(404).json({ message: 'No User find with this Id!' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then((user) => 
              !user
                 ? res.status(404).json({ message: 'No user find with this id!'})
                 : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    } 
}