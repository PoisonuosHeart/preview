import {React, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'
import {useContext} from 'react'

import {Modal} from '../components/Modal.jsx'
import {RegistrCard} from '../components/RegistrCard'

export const AuthPage = () => {
    const {loading, error, request, clearError} = useHttp()
    const auth = useContext(AuthContext)
    const message = useMessage()
    const [form, setForm] = useState({  
        email: '', password: ''
    })

    const [ModalActive, setModalActive] = useState(false); // ??? Для отладки - true

    useEffect(() => {   // Вывести всплывающие сообщение по результатам ошибок валидации
        if(error)
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => { // Сделать по-дэфолту активным элемент ввода e-mail
        window.M.updateTextFields()
    }, [])

    const changeHandler = event => {//  При изменении формы
        setForm({...form, [event.target.name]: event.target.value}) 
    }

    // const registerHandler = async () => { // Отправка запроса регистрации на сервер
    //     try {
    //         const data = await request('/api/auth/register', 'POST', {...form} )
    //         console.log('data: ', data)
    //     } catch (e) {} // в request уже есть вся обработка
    // }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form} )
            auth.login(data.token, data.userId)
        } catch (e) {
            
        }
    }

    return (
        <div className = "row">
            <div className="col s6 offset-s3">
                <h1>Auth Page</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите email" 
                                    id="email" 
                                    type="text" 
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input 
                                    placeholder="Введите пароль" 
                                    id="password" 
                                    type="password" 
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">

                        <button className="btn yellow darken-4"
                        onClick={loginHandler}
                        disabled={loading}>
                            Войти
                        </button>

                        <button className="btn gray lighten-1 black-text"
                        onClick={() => setModalActive(true)  /*Было  registerHandler*/}
                        disabled={loading}> 
                            Зарегистрироваться
                        </button>
                        
                    </div>
                </div>
            </div>
            <Modal active={ModalActive} setActive={setModalActive} children={<RegistrCard/>}/>
        </div>
    )
}