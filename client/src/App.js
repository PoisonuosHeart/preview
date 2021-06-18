import React, { useCallback, useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { Navbar } from './components/Navbar'
import { Loader } from './components/Loader'
import 'materialize-css'
import './components/componentsStyle/app.css'
import { MFooter } from './components/Footer'

// import socket from './socket'

function App() {
  // socket.on('server said', (obj) => {
  //   console.log(obj.hell)
  //   socket.emit("my msg", "ya client")
  // })

  // const connectTosocket = useCallback(() => {
  //     socket.on('connection', msg => {
  //       console.log('Подключился к connection на клиенте id: ', socket.id)
  //       console.log(msg)
  //   })
  // }, [])

  // useEffect(() => {
  //   connectTosocket()
  // }, [])

  const { token, userId, login, logout, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated, userId)

  if (!ready) {
    // Модуль авторизации не отработал
    return <Loader />
  }
  return [
    <header key={'header'}></header>,
    <main key={'rootmain'}>
      <AuthContext.Provider
        value={{ isAuthenticated, login, logout, token, userId }}
        key={'ctx'}>
        <Router>
          {isAuthenticated && <Navbar key={'nav'} />}
          <div key={'rootDiv'}>
            <div className='row prntRow' key='under-section-1'>
              <div className='row afterNav'>
                <h3 key={'h1'} className='col s12 center art'>
                  Исскуство - ты
                </h3>
              </div>
            </div>
            {routes /*Отображает одну из pages*/}
            <div key='under-section-2' className='row'>
              <div className='col s12 center footerLabel'>
                <h4>Создай свой мир</h4>
              </div>
            </div>
          </div>
        </Router>
      </AuthContext.Provider>
    </main>,
    <MFooter key={'foot'} />,
  ]
}

export default App
