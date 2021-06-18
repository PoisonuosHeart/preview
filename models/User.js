const {Schema, model, Types} = require('mongoose')

const userSchema = Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}] // Ссылки этого пользователя
})

module.exports = model('User', userSchema)