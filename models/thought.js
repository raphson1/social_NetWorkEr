const { Schema, Types, model} = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlenght: 280,
            minlenght: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: () => moment().format("MM/DD/YYYY"),

        },
        username: {
            type: String,
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

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;