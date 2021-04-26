import { Input } from "../../Components/Input/Input"
import { PrimaryButton } from "../../Components/PrimaryButton.js/PrimaryButton"
import { SecondaryButton } from "../../Components/SecondaryButton/SecondaryButton"
import "./LoginScreen.scss"
import {Link, Redirect} from 'react-router-dom'
import { useContext, useState } from "react"
import axios from 'axios'
import { api } from "../../Util/api"
import { AuthContext } from "../../State/AuthState/AuthProvider"
import { Loading } from "../../Components/Loading/Loading"

export const LoginScreen = () => {
    const {authState, authDispatch} = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const login = async() => {
        setLoading(true)
        await axios.post(api + "login", {
            email: email,
            password: password
        },{
            withCredentials: true,
        }).then(async(res) => {
            const data = res.data
            if(data.Error) {
                setLoading(false)
                return console.log(data.Error)
            }
            await authDispatch({type: "authenticate", data: data})
            return setLoading(false)
        })
    }

    if(loading) return <Loading/>

    if(authState.isAuth) return <Redirect to="/"/>

    return(
        <div className="LoginScreen">
            <h2>ASK AWAY</h2>
            <Input onChange={e => setEmail(e.target.value)} placeholder="email" type="email"/>
            <Input onChange={e => setPassword(e.target.value)} placeholder="password" type="password"/>
            <PrimaryButton onClick={login} >
                Login
            </PrimaryButton>
            <Link to="/register">
                <SecondaryButton>
                    Register
                </SecondaryButton>
            </Link>
        </div>
    )
}