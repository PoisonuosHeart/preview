import React from 'react'
import GetNews from './../repo/GetNews'
import NewsItem from './NewsItem'
import Preloader from './Preloader'

export default function News() {
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])
  const news = GetNews()
  return (
    <React.Fragment>
      <div className='row'>
        <h4 className='center'>Новости</h4>
      </div>
      {loading && <Preloader />}
      {!loading && (
        <div className='row'>
          <div className='col s10 offset-s1 '>
            <ul className='collection'>
              {news.map((ne, i) => (
                <NewsItem news={{ ...ne, id: i }} key={i} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
