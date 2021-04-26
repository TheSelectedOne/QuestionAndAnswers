import { Input } from "../../Components/Input/Input"
import { PrimaryButton } from "../../Components/PrimaryButton.js/PrimaryButton"
import { SecondaryButton } from "../../Components/SecondaryButton/SecondaryButton"
import "./RegisterScreen.scss"
import {Link, Redirect} from 'react-router-dom'
import { useContext, useState } from "react"
import { Loading } from "../../Components/Loading/Loading"
import axios from 'axios'
import { api } from "../../Util/api"
import { AuthContext } from "../../State/AuthState/AuthProvider"

export const RegisterScreen = () => {
    const {authState, authDispatch} = useContext(AuthContext)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const register = async() => {
        setLoading(true)
        await axios.post(api + "register", {
            username,
            email,
            password,
            confirmPassword
        }, {
            withCredentials: true
        }).then(async(res) => {
            const data = res.data
            if(data.Error) return console.log(data.Error)
            await authDispatch({type: "authenticate", data: data})
            return setLoading(false)
        })
    }

    if(authState.isAuth){
        return <Redirect to="/"/>
    }
    if(loading){
        return <Loading/>
    }
    return(
        <div className="RegisterScreen">
            <h2>ASK AWAY</h2>
            <Input onChange={e => setUsername(e.target.value)} placeholder="username" type="text"/>
            <Input onChange={e => setEmail(e.target.value)} placeholder="email" type="email"/>
            <Input onChange={e => setPassword(e.target.value)} placeholder="password" type="password"/>
            <Input onChange={e => setConfirmPassword(e.target.value)} placeholder="confirm password" type="password"/>
            <PrimaryButton onClick={register} >
                Register
            </PrimaryButton>
            <Link to="/login">
                <SecondaryButton>
                    Login
                </SecondaryButton>
            </Link>
        </div>
    )
}