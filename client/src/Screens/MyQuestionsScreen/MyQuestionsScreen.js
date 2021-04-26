import { useContext, useEffect, useState } from "react"
import { Question } from "../../Components/Question/Question"
import "./MyQuestionsScreen.scss"
import axios from 'axios'
import { api } from "../../Util/api"
import {useParams} from 'react-router-dom'
import { ModalContext } from "../../State/ModalState/ModalProvider"

export const MyQuestionsScreen = () => {
    const [questions, setQuestions] = useState([])
    const {username} = useParams()
    const {modalState, modalDispatch} = useContext(ModalContext)

    const getQuestions = async() => {
        await axios.get(api + username).then(res => {
            const data = res.data
            if(data.Error) return console.log("no questions")
            setQuestions(data)
            return
        })
    }

    useEffect(() => {
        getQuestions()
        if(modalState.userModal){
            modalDispatch({type: "toggleUserModal"})
        }
    }, [])
    return(
        <div className="QuestionsScreen">
            <p>{username} Questions</p>
            {
                questions.map(q => <Question key={q.id} data={q} />)
            }
        </div>
    )
}