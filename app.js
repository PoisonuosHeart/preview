const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express() // Сервер
const server = require('http').Server(app)
const io = require('socket.io')(server, {cors: {origin: '*'}})

// Получить обработчики событий
/* */

// При подключении сокета
// const onConnection = socket => {
//     console.log("user: ", socket.id + " connected")
    
// }

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes')) // руты авторизации
app.use('/api/link', require('./routes/link.routes')) // руты ссылок
app.use('/t', require('./routes/redirect.routes'))    // для коротких ссылок
app.use('/api/message', require('./routes/message.routes'))


const PORT = config.get('port') || 5000

async function start(){
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex:true
        })
            
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1) // Выход по ошибке
    }
}

start() // Запуск сервера

const {listenReqOnUsers, listenReqOnMessages, litenUserSaveMessage} = require('./handlers/users.handler')

io.sockets.on('connection', socket => {
    console.log('socket connected id: ', socket.id)
    
    // socket.on('usrMsg', msg => {
    //     console.log(msg)
    //     // socket.broadcast.emit('usrMsg', msg)
    //     // socket.emit('usrMsg', msg)
    // })
    socket.emit('connection', 'hello from server')

    listenReqOnUsers(socket, 'getUserList', 'takeUserList') // Слушает запрос на выборку всех пользователей и отсылает
    listenReqOnMessages(socket, 'giveMessageList', 'getMessageList')
    //socket.emit('server msg', {hell: 'Ya blyat'})

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
      })

    litenUserSaveMessage(socket, "listenMsg")
    // socket.on("listenMsg", msg => {
    //     console.log("msg usr._id: ", msg.recipient._id)
    //     console.log("msg: ", msg.msg)
    //     console.log("sender: ", msg.sender)
    // })
    
})




server.listen(PORT, () => console.log(`App started on port: ${PORT}...`))
