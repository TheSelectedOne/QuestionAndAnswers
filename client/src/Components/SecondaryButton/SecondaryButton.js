import "./SecondaryButton.scss"

export const SecondaryButton = ({children, onClick}) => {

    return(
        <button onClick={onClick} className="SecondaryButton">
            {children}
        </button>
    )
}