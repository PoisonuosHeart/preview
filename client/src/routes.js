import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'

import { DetailPage } from './pages/DetailPage'
import { ErrorPage } from './pages/ErrorPage'
import { MainPage } from './pages/MainPage'
import MessageRoomsPage from './pages/MessageRoomsPage'
import News from './components/News'

export const useRoutes = (isAuthenticated, userId) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path='/detail/:id'>
          <DetailPage />
        </Route>
        <Route exact path='/messages/:id/all'>
          <MessageRoomsPage />
        </Route>
        <Route exact path='/news/all'>
          <News />
        </Route>
        <Route exact path='/:id'>
          <MainPage sendId={userId} />
        </Route>
        <Redirect to={`/${userId === null ? '' : userId}`}>
          <MainPage sendId={userId} />
        </Redirect>
      </Switch>
    )
  }

  // Набор jsx для неаутентифицированных пользователей
  return (
    <Switch>
      <Route path='/' exact>
        <AuthPage />
      </Route>
      <Route path='/error' exact>
        <ErrorPage />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}
