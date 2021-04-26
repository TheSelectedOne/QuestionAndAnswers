import "./AnswerButton.scss"

export const Answerbutton = ({onClick}) => {

    return(
        <button onClick={onClick} className="AnswerButton">
            Write Your Answer
        </button>
    )
}