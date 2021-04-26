import { Link } from "react-router-dom"
import { SecondaryButton } from "../SecondaryButton/SecondaryButton"
import "./Question.scss"

export const Question = ({data}) => {
    
    return(
        <div className="Question">
            <p>{data.username}</p>
            <h3>{data.question} </h3>
            
            <Link to={{
                pathname: "/question/" + data.id,
                data: data
                }}>
                <SecondaryButton>
                    Answers
                </SecondaryButton>
            </Link>
        </div>
    )
}