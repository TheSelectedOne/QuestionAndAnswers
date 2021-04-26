import { useContext, useState } from 'react'
import { PrimaryButton } from '../../Components/PrimaryButton.js/PrimaryButton'
import { SecondaryButton } from '../../Components/SecondaryButton/SecondaryButton'
import { Textarea } from '../../Components/Textarea/Textarea'
import { ModalContext } from '../../State/ModalState/ModalProvider'
import './AskModal.scss'
import axios from 'axios'
import { api } from '../../Util/api'
import { LoadingModal } from '../LoadingModal/LoadingModal'

export const AskModal = () => {
    const {modalDispatch} = useContext(ModalContext)
    const [question, setQuestion] = useState("")
    const [loading, setLoading] = useState(false)

    const cancel = () => {
        modalDispatch({type: "toggleQuestionModal"})
    }
    const ask = async() => {
        if(question.length <= 3) return console.log("Is u dumb?")
        setLoading(true)
        await axios.post(api + "question", {
            question
        },{
            withCredentials: true
        }).then(async(res) => {
            const data = res.data
            if(data.Error){
                setLoading(false)
                console.log(data.Error)
            }   
            setLoading(false)
            return console.log(data)
        })
        cancel()
    }

    if(loading) return <LoadingModal/>

    return(
        <div className="AskModal">
            <h2>ASK AWAY</h2>
            <Textarea onChange={e => setQuestion(e.target.value)} />
            <div className="Buttons">
                <SecondaryButton onClick={cancel} >
                    Cancel
                </SecondaryButton>
                <PrimaryButton onClick={ask} >
                    ASK
                </PrimaryButton>
            </div>
        </div>
    )
}