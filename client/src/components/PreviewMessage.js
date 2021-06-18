import React from 'react'
import './componentsStyle/PreviewMessage.css'

const PreviewMessage = ({ info }) => {
  return (
    <div className='row' key={info.id + Math.random() + 10}>
      <div className='col s9 offset-s2' key={info.id + Math.random() + 2}>
        <ul className='collection PrMsgCollection'>
          <li
            className='collection-item avatar PrMsgContainer'
            key={info.id + Math.random() + 11}>
            <img
              src='https://vjoy.cc/wp-content/uploads/2019/06/1-12.jpg'
              alt=''
              className='circle'
            />
            <span className='title'>{info.name}</span>
            <p>{info.message}</p>

            <a href='#!' className='secondary-content'>
              <i className='material-icons'>chat</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PreviewMessage
