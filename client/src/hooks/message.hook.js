import{useCallback} from 'react'

export const useMessage = () => {
    return useCallback(async text => {
        if(window.M && text){
            window.M.toast({html: text, classes: 'Toast'})
        }
    }, [])
}