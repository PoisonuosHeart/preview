import React, { useCallback, useEffect, useState, useRef} from 'react'
import {Link} from 'react-router-dom'
import DialogUser from './DialogUser'

import socket from '../socket'


const UsersList = () => {
    const [usrs, setUsrs] = useState(null) 
    const [usrReciver, setUsrReciver] = useState(null)
    const usrsRef = useRef()
    const usrReciverRef = useRef()

    const [mes, setMes] = useState(false)

    usrsRef.current = usrs
    usrReciverRef.current = usrReciver
    
    const getUsrs = useCallback(() => {
        socket.emit('getUserList')
        socket.on('takeUserList', dataUsers => {
            console.log('Подключился к прослушиванию сообщений в user list с id: ', socket.id)
            //console.log('Сервер прислал в связи с этим: ', dataUsers)
            setUsrs(dataUsers)
        })
    }, [])

    
    useEffect(() => {
        getUsrs()
        return () => {
            socket.offAny('takeUserList')
            socket.offAny(getUsrs)
        }
    }, [])

    useEffect(() => {
        console.log('обновилось: ', usrsRef.current)
    }, [])
    

    
  
   
   //console.log('id coketa: ', socket)
   // Идентичны socket из App.js и этот socket

    return (
        <div>
            {console.log('users: ', usrsRef.current)}
           <div style={{maxHeight: '150px', height:'150px', overflowY: 'scroll'}}>
               <div>
               {usrsRef.current !== null && usrsRef.current !== undefined && usrsRef.current.map((usr, index) => <div key = {index}>
                   {`usr email: ${usr.email}`}
                   <Link to="#" onClick = {() => {setMes(mes => !mes); setUsrReciver(usr)} } className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">mail</i></Link>
                   {/* <button onClick = {() => setMes(!mes)}/> */}
               </div>)}
               </div>
            </div>
        {mes && <DialogUser usr = {usrReciverRef.current}/>}
        </div>
    )
}

export default UsersList