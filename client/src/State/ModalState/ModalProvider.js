import { createContext, useReducer } from "react";
import { ModalReducer } from "./ModalReducer";

export const ModalContext = createContext()

export const ModalProvider = ({children}) => {
    const [modalState, modalDispatch] = useReducer(ModalReducer, [], () => {
        return{
            answerModal: false,
            questionModal: false,
            userModal: false
        }
    })

    return(
        <ModalContext.Provider value={{modalState, modalDispatch}}>
            {children}
        </ModalContext.Provider>
    )
}