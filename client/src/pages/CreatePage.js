import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    useEffect(() => { // Сделать по-дэфолту активным элемент ввода e-mail
        window.M.updateTextFields()
    }, [])

    const {request} = useHttp()
    const [link, setLink] = useState('')
    const history = useHistory()
    const pressHandler = async (event) => {
        if(event.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, 
                {Authorization: `Bearer ${auth.token}`}) // Authorization говорит нам, что request от пользователя с токеном: auth.token  
                history.push(`/detail/${data.link._id}`)
            } catch (e) {
                
            }
        }
    }
    return (
        <div className="row">
           <div className="col s8 offset-s2">
                <div className="input-field">
                    <input 
                        placeholder="Вставьте ссылку" 
                        id="link" 
                        type="text" 
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}