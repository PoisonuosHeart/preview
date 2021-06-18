const { response } = require("express")
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1] // 'Bearer TOKEN' - общий вид строки authorization
        if(!token){
            res.status(401).json({message: 'Не авторизован'})
            return
        }

        const decoded = jwt.verify(token, config.get('secret'))
        req.user = decoded
        next()

    } catch (e) {
        res.status(401).json({message: 'Не авторизован'})
    }
}