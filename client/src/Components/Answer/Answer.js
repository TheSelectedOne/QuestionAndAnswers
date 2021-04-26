import "./Answer.scss"

export const Answer = ({data}) => {
    console.log(data)
    return(
        <div className="Answer">
            <p>{data.username}</p>
            <h4>{data.answer}</h4>
        </div>
    )
}