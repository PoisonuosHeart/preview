import React from 'react'

export default function NewsItem({ news }) {
  console.log(news)
  return (
    <li className='collection-item' key={news.id}>
      <i>{news.tittle}</i>
      <br />
      &nbsp;&nbsp;{news.article}
    </li>
  )
}
