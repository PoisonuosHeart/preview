const {Types, model, Schema} = require('mongoose') 

const messageSchema = new Schema({
    messages: [{author: {type: Types.ObjectId, ref: 'User'}, textMessage: {type: String}}],
    sender: {type: Types.ObjectId, ref: 'User'},
    recipient: {type: Types.ObjectId, ref: 'User'},
    owners: [{type: Types.ObjectId, ref: 'User'}]
})

module.exports = model('Message', messageSchema)