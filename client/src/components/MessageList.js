import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from './../context/AuthContext'

import socket from './../socket'

const listenSock = 'getMessageList'
const talkSock = 'giveMessageList'

const MessageList = () => {
  const auth = useContext(AuthContext)
  const [messages, setMessages] = useState(null)

  const messagesRef = useRef()
  messagesRef.current = messages

  const getMess = useCallback(() => {
    socket.emit(talkSock, auth.userId)
    socket.on(listenSock, (usersMessages) => {
      console.log(
        'Подключился к прослушиванию сообщений в user list с id: ',
        socket.id,
      )
      //console.log('Сервер прислал в связи с этим: ', dataUsers)
      setMessages(usersMessages)
      //console.log(messagesRef.current)
    })
  }, [])

  useEffect(() => {
    getMess()
    return () => {
      socket.offAny(listenSock)
      socket.offAny(getMess)
    }
  }, [])

  return (
    <div>
      {messagesRef.current === null || messagesRef.current.length < 2 ? (
        <div>сообщений нет</div>
      ) : (
        <ul className='collection'>
          {messagesRef.current.map((mes, index) => (
            // <Link to="#!" className="collection-item"><span className="badge">{mes.messages[mes.messages.length - 1].textMessage}</span>message</Link>
            <li key={index} className='collection-item avatar'>
              <img src='ava.png' alt='' className='circle' />
              <span className='title'>От {mes.recipient}</span>
              <p>Сообщение</p>
              <p>{mes.messages[mes.messages.length - 1].textMessage}</p>
              <Link to='#!' className='secondary-content'>
                <i className='material-icons'>message</i>
              </Link>
            </li>
          ))}{' '}
        </ul>
      )}
    </div>
  )
}

export default MessageList
