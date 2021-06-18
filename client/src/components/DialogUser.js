// import socket from '../socket'
// import React, {useEffect} from 'react'

import { useContext } from 'react'
import {AuthContext} from './../context/AuthContext'
import socket from '../socket'

const DialogUser = ({usr}) => {   
    const auth = useContext(AuthContext)

    const sendMessage = (msg) => {
        console.log("Был клик")
        socket.emit("listenMsg", msg)
    }

    console.log(`id user-а по котором клик: ${usr._id}`)
    return(
        <div>
            <p className = "myOutput">Тут текст</p>
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                        <i className="material-icons prefix">mode_edit</i>
                        <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                        <label htmlFor="icon_prefix2">First Name</label>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-large" /*type="submit" name="action"*/ onClick={() => {
                        var txtMsg = document.querySelector(".materialize-textarea").value
                        sendMessage({msg: txtMsg, recipient: usr,
                    sender: auth.userId})}
                        }>
                        <i className="material-icons center">send</i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DialogUser