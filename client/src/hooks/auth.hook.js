import {useCallback, useEffect, useState} from 'react'

const storageName = 'userData' // идентификатор данных пользователя в localStorage

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(false) // Прошла ли авторизован

    const login = useCallback(async (jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken}))
    }, [])

    const logout = useCallback(async () => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))
        if(data && data.token){
            login(data.token, data.userId)
        }

        setReady(true) // Пользователь был успешно авторизован
    }, [login])

    return {login, logout, token, userId, ready}
}