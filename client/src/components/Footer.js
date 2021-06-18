import React from 'react'
import { Footer } from 'react-materialize'
import './../index.css'
import author from './../images/author.jpg'
import './../images/author.css'

export const MFooter = () => {
  return [
    <div className='divider black' key={'mfooterdiv'} />,
    <Footer
      key='footerKey'
      className='grey darken-3'
      copyrights={
        <div className='row'>
          <div className='col s6'>
            <text>&#169; 2021 Права принадлежат мне</text>
          </div>
          <div className='col s6'>
            <a href='https://github.com/PoisonuosHeart' className='right'>
              Ссылка на github
            </a>
          </div>
        </div>
      }
      links={
        <div className='row'>
          <div className='col s12 offset-s4'>
            <p className='left'>Сведения об авторе:</p>
          </div>
          <div className='col s2 offset-s5'>
            <img
              className='right authorIcon'
              width='70px'
              height='70px'
              src={author}
            />
          </div>
          <div className='col s5'>
            <p className=''>
              Студент: ИВТ/б-17-2о
              <br />
              Герасимец М.В.
            </p>
          </div>
        </div>
      }>
      <p className='grey-text text-lighten-4' key={'moreLinks'}>
        <div className='row'>
          <div className='col s11'>
            <i>
              <text>
                Искусство заключается в том, чтобы найти необыкновенное в
                обыкновенном и обыкновенное в необыкновенном.
              </text>
              <br />
              <text className='right'>&#169; Дени Дидро</text>
            </i>
          </div>
        </div>
      </p>
    </Footer>,
  ]
}
