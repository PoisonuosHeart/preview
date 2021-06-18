const User = require('./../models/User')
const Message = require('./../models/Message')
const crypto = require('crypto'),
                algorithm = 'aes-256-ctr',
                password = 'mishka';

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
    }
    
function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}


const listenReqOnUsers = (socket, fromChannel, toChannel) => {
    socket.on(fromChannel, async () => {
        const dataUsers = await User.find()
        socket.emit(toChannel, dataUsers)
    })
}

const listenReqOnMessages = (socket, fromChannel, toChannel) => {
    socket.on(fromChannel, async (data) => {
        const dataUsers = await Message.find({$or: [{sender: data}, {recipient: data}]})
        // расшифровать
        dataUsers.forEach(element => {
            element.messages.forEach(subEl => {
                subEl.textMessage = decrypt(subEl.textMessage)
            })
        })
        //console.log("dtusr: ", dataUsers)
        socket.emit(toChannel, dataUsers)
    })
}

const litenUserSaveMessage = (socket, fromChannel) => {
    socket.on(fromChannel, async (data) => {
        if(data.msg.length > 0){
            const fnd = await Message.findOne({$or: [{sender: data.sender, recipient: data.recipient}, 
                {sender: data.recipient, recipient: data.sender}]})
            if(fnd !== null){
                //console.log("dok: ", fnd)
                fnd.messages.unshift({author: data.sender, textMessage: encrypt(data.msg)})
                const updMsg = new Message(fnd)
                await updMsg.save()
            }else{
                //console.log("файл: ", fnd)
                const newMsg = new Message({messages: {author: data.sender, textMessage: encrypt(data.msg)}, sender: data.sender, recipient: data.recipient})
                await newMsg.save()
            } 
        }
        else console.log("Не добавить в БД, сообщение пусто")
    })
}

module.exports = {listenReqOnUsers, listenReqOnMessages, litenUserSaveMessage}