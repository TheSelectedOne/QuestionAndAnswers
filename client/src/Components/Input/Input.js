import "./Input.scss"

export const Input = ({placeholder, type, onChange}) => {

    return(
        <input onChange={onChange} className="Input" type={type} placeholder={placeholder}/>
    )
}