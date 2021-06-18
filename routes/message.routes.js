const {Router} = require('express')
const auth = require('../middleware/auth.middleware')
const Message = require('../models/Message')

const router = Router()


router.get('/users', auth, (req, res) => {
    console.log('Пользователь ' + ' хочет получить всех юзеров')
    return res.status(200).json('oh')
})


module.exports = router