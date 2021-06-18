import React from 'react'
import { useParams } from 'react-router-dom'
import { CreatePage } from './CreatePage'
import { LinksPage } from './LinksPage'
import UsersList from '../components/UsersList'
import DialogUser from '../components/DialogUser'
import MessageList from '../components/MessageList'

import { CarouselImg } from '../components/CarouselImg'
import img10 from '../images/img10.jpg'
import img11 from '../images/img11.jpg'
import img12 from '../images/img12.jpg'
import img13 from '../images/img13.jpg'

export const MainPage = ({ sendId }) => {
  const images = [img10, img11, img12, img13]

  const options = {
    dist: -50,
    duration: 200,
    fullWidth: false,
    indicators: false,
    noWrap: false,
    numVisible: 3,
    onCycleTo: null,
    padding: 0,
    shift: 0,
  }

  const carouselId = 4
  const carouselSetings = {
    carouselId: carouselId,
    images: images,
    options: options,
    date: new Date(),
  }
  console.log('sendId: ', sendId)
  const { id } = useParams()
  console.log('id: ', id)
  // sendId - id хозяина
  if (sendId !== null && id != null && id !== sendId)
    // Возвратить компонент со страницей другого пользователя
    return (
      <div>
        <p>Главная пользователя: {id}</p>
        {(() => {
          switch (id) {
            case 'create':
              return <CreatePage />
            case 'users':
              return <UsersList />
            case 'links':
              return <LinksPage />
            case 'msgs':
              return <DialogUser />
            case 'myMessages':
              return <MessageList />
            default:
              break
          }
        })()}
      </div>
    )
  // Компоннт начинки этого пользователя
  else
    return (
      <div className='col s12 center'>
        <h5>Новые работы, которые могут вам понравится</h5>
        <CarouselImg props={carouselSetings} />
      </div>
    )
}
