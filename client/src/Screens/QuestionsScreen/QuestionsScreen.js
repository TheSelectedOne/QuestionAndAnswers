import { useEffect, useState } from "react"
import { Question } from "../../Components/Question/Question"
import "./QuestionsScreen.scss"
import axios from 'axios'
import { api } from "../../Util/api"

export const QuestionsScreen = () => {
    const [questions, setQuestions] = useState([])
    console.log(questions)

    const getQuestions = async() => {
        await axios.get(api + "questions").then(res => {
            const data = res.data
            if(data.Error) return console.log("no questions")
            setQuestions(data)
            return
        })
    }

    useEffect(() => {
        getQuestions()
    }, [])
    return(
        <div className="QuestionsScreen">
            {
                questions.map(q => <Question key={q.id} data={q} />)
            }
        </div>
    )
}