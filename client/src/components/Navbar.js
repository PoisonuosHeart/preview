import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import './componentsStyle/navbar.css'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  return (
    <nav className='row'>
      <div className='nav-wrapper grey darken-3'>
        <div className='col s6'>
          <a href='/' className='logoIcon'>
            <img src='/assets/images/belka1.png' height='60px' width='60px' />
          </a>
          <a href='/' className='brand-logo'>
            Art
          </a>
        </div>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <NavLink to={`/messages/${auth.userId}/all`}>Сообщения</NavLink>
          </li>
          <li>
            <NavLink to='/news/all'>Новости</NavLink>
          </li>
          <li>
            <NavLink to='/links'>Ссылки</NavLink>
          </li>
          <li>
            <NavLink to='/users'>Пользователи</NavLink>
          </li>
          <li>
            <a href='/' onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
