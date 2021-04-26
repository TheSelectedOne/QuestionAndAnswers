import {createContext, useReducer} from 'react'
import { AuthReducer } from './AuthReducer'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [authState, authDispatch] = useReducer(AuthReducer, [], () => {
        return{
            isAuth: false
        }
    })

    return(
        <AuthContext.Provider value={{authState, authDispatch}} >
            {children}
        </AuthContext.Provider>
    )

}