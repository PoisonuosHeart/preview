import {useState, useCallback} from 'react' // useCallback - для async функций, чтобы React не входил в рекурсию

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const request = useCallback(async (url, method="GET", body= null, headers={} ) => {
        setLoading(true) // Запрос пошел
        try {
            if(body){
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const responce = await fetch(url, {method, body, headers}) 
            const data = await responce.json()

            if(!responce.ok){
                throw new Error(data.message || 'Что-то пошло не так')
            }

            setLoading(false) // Запрос завершился

            return data
        } catch (e) {
            setLoading(false) // Запрос завершился
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(async () => setError(null), [])

    return {loading, request, error, clearError}
}