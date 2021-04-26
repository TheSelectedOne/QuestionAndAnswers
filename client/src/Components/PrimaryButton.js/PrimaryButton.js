import "./PrimaryButton.scss"

export const PrimaryButton = ({children, onClick}) => {
    
    return(
        <button onClick={onClick} className="PrimaryButton" >
            {children}
        </button>
    )
}