import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../State/AuthState/AuthProvider"
import "./UserModal.scss"
export const UserModal = () => {
    const {authState} = useContext(AuthContext)
    return(
        <div className="UserModal">
            <Link style={{textDecoration: "none", color:"white"}} to={"/user/" + authState.data.username}>
                <h4>My Questions</h4>
            </Link>
            <h4 id="logout" >Log Out</h4>
        </div>
    )
}