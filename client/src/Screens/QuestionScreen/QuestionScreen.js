import { Answer } from "../../Components/Answer/Answer"
import { Answerbutton } from "../../Components/AnswerButton/AnswerButton"
import { Question } from "../../Components/Question/Question"
import "./QuestionScreen.scss"
import {useParams} from "react-router-dom"
import axios from 'axios'
import { api } from "../../Util/api"
import { useContext, useEffect, useState } from "react"
import { ModalContext } from "../../State/ModalState/ModalProvider"
import { AnswerModal } from "../../Modals/AnswerModal/AnswerModal"

export const QuestionScreen = ({location}) => {
    const {id} = useParams()
    const [question, setQuestion] = useState({})
    const [answers, setAnswers] = useState([])
    const {modalState, modalDispatch} = useContext(ModalContext)

    const addAnswer = (answer) => {
        setAnswers([answer, ...answers])
    }
    
    const toggleAnswerModal = () => {
        modalDispatch({type: "toggleAnswerModal"})
    }

    const getAnswers = async() => {
        await axios.get(api + "answers/" + id).then(res => {
            const data = res.data
            if(data.Error) return console.log(data.Error)
            return setAnswers(data)
        })
    }
    const getQuestion = async() => {
        await axios.get(api + "question/" + id).then(
            res => {
                const data = res.data
                if(data.Error) return console.log(data.Error)
                return setQuestion(data)
            }
        )
    }
    useEffect(() => {
        if(!location.data){
            getQuestion()
        }
        if(location.data){
            setQuestion(location.data)
        }
        getAnswers()
    }, [])
    return(
        <div className="QuestionScreen">
            <Question data={question}/>
            {answers.length === 0 ? <p style={{color: "white", textAlign: "center"}} >No Answers yet</p> : 
                answers.map(a => <Answer key={a.id} data={a}/>)
            }
            <Answerbutton onClick={toggleAnswerModal} />
            {modalState.answerModal ? <AnswerModal addAnswer={addAnswer} questionId={id} /> : null}
        </div>
    )
}