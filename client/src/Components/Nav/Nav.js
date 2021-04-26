import { useContext } from 'react'
import { AuthContext } from '../../State/AuthState/AuthProvider'
import { PrimaryButton } from '../PrimaryButton.js/PrimaryButton'
import { SecondaryButton } from '../SecondaryButton/SecondaryButton'
import './Nav.scss'
import {Link, useLocation} from 'react-router-dom'
import { ModalContext } from '../../State/ModalState/ModalProvider'

export const Nav = () => {
    const {pathname} = useLocation()
    const{authState} = useContext(AuthContext)
    const{modalDispatch} = useContext(ModalContext)

    const toggleQuestionModal = () => {
        modalDispatch({type: "toggleQuestionModal"})
    }

    const toggleUserModal = () => {
        modalDispatch({type: "toggleUserModal"})
    }

    if(pathname === "/login" || pathname === "/register" || pathname.startsWith("/question/")){
        return(
            <div className="Nav">
                <Link to="/">
                    <SecondaryButton>
                        back
                    </SecondaryButton>
                </Link>
            </div>
        )
    }
    if(!authState.isAuth){
        return(
            <div className="Nav">
                <Link to="/login">
                    <SecondaryButton>
                        Login
                    </SecondaryButton>
                </Link>
                <Link to="/register">
                    <PrimaryButton>
                        SIGN UP
                    </PrimaryButton>
                </Link>
            </div>
        )
    }

    return(
        <div className="Nav">
            {pathname.startsWith("/user") && 
            <Link to="/">
                <SecondaryButton>
                    back
                </SecondaryButton>
            </Link>}
            <button onClick={toggleUserModal} id="username">
                {authState.data.username}
            </button>
            <PrimaryButton onClick={toggleQuestionModal}>
                ASK
            </PrimaryButton>
        </div>
    )
}