import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { AuthContext } from './../context/AuthContext'
import Preloader from './../components/Preloader'
import PreviewMessage from './../components/PreviewMessage'
import GetUsers from '../repo/GetUsers'
import GetMessage from '../repo/GetMessage'

const MessageRoomsPage = () => {
  const history = useHistory()
  const { id } = useParams()
  const auth = useContext(AuthContext)

  if (id !== auth.userId) {
    history.push('/')
  }

  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  const users = GetUsers()
  const message = GetMessage()
  const info = users.map((usr, i) => ({
    ...usr,
    message: message[i].message,
    id: i,
  }))

  return (
    <React.Fragment>
      <div className='row'>
        <h3 className='center-align'>Сообщения:</h3>
        {loading && <Preloader />}
      </div>
      {!loading &&
        info.map((info, i) => <PreviewMessage info={info} key={i} />)}
    </React.Fragment>
  )
}

export default MessageRoomsPage
