import {React, useEffect, useState, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import {useHistory} from 'react-router-dom'
import '../components/componentsStyle/RegistrCard.css'

export const RegistrCard = () => {
  const history = useHistory()
  const {loading, error, request, clearError} = useHttp()
  const message = useMessage()
  const [form, setForm] = useState({  
    email: '', password: ''
    })

    const changeHandler = event => {//  При изменении формы
      setForm({...form, [event.target.name]: event.target.value}) 
    }

    useEffect(() => {   // Вывести всплывающие сообщение по результатам ошибок валидации
      if(error){
        message(error)
        clearError()
      }
  }, [error, message, clearError, history])

  const registerHandler = useCallback(async () => { // Отправка запроса регистрации на сервер
        try {
            const data = await request('/api/auth/register', 'POST', {...form} )
            history.push('/error') // ?? Временно, потом редирект на страницу подтверждения или главную пользователя
            console.log('data: ', data)
        } catch (e) {} // в request уже есть вся обработка {сообщение об ошибке в useEffect будет, т.к. меняется err}
    }, [form, request, history])

    return(
        <div className="row" style={{display: 'inline-block'}}>
                
        <div className="col">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title center">Регистрация</span>
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
            <div className="card-action center">
             
              <button disabled={loading} onClick={registerHandler} className="waves-effect waves-light btn"><i className="material-icons center">check</i></button>
              
            </div>
          </div>
        </div>
      </div>
    )
}