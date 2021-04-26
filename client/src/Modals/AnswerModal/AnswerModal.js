import { useContext, useState } from 'react'
import { PrimaryButton } from '../../Components/PrimaryButton.js/PrimaryButton'
import { SecondaryButton } from '../../Components/SecondaryButton/SecondaryButton'
import { Textarea } from '../../Components/Textarea/Textarea'
import { ModalContext } from '../../State/ModalState/ModalProvider'
import './AnswerModal.scss'
import axios from 'axios'
import { api } from '../../Util/api'
import { LoadingModal } from '../LoadingModal/LoadingModal'

export const AnswerModal = ({questionId, addAnswer}) => {
    const {modalDispatch} = useContext(ModalContext)
    const [answer, setAnswer] = useState("")
    const [loading, setLoading] = useState(false)

    const cancel = () => {
        modalDispatch({type: "toggleAnswerModal"})
    }

    const answerBtn = async() => {
        if(!answer) return console.log("LMAO")
        setLoading(true)
        await axios.post(api + "answer", {
            questionId,
            answer
        }, {
            withCredentials: true
        }).then(res => {
            const data = res.data
            if(data.Error) {
                setLoading(false)    
                return console.log(data.Error)
            }
            setLoading(false)
            return addAnswer(data)
        })
        cancel()
    }

    if(loading) return <LoadingModal/>
    return(
        <div className="AnswerModal">
            <h2>ANSWER AWAY</h2>
            <Textarea onChange={e => setAnswer(e.target.value)} />
            <div className="Buttons">
                <SecondaryButton onClick={cancel}>
                    Cancel
                </SecondaryButton>
                <PrimaryButton onClick={answerBtn} >  
                    ANSWER
                </PrimaryButton>
            </div>
        </div>
    )
}