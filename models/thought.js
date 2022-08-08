const { Schema, Types, model} = require('mongoose');
const reactionSchema = require('./reaction');
const thoughtSchema = new Schema(
    {
        thoughtText: {
            types: String,
            required: true,
            maxlenght: 280,
            minlenght: 1,
        },
        createdAt: {
            types: Date,
            default: Date.now(),

        },
        username: {
            types: String,
            required: true,
        },
        reactions :[
            reactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)

thoughtSchema.virtuals('reactionCount').get(() => {
    return this.reactions.length
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;