const BasicButton = ({text, type, onClick, className = null}) => {
    
    const fullButton = "bg-orange p-2 rounded-md hover:bg-transparent border-2 border-transparent hover:border-orange";
    const outlineButton = "hover:bg-orange p-2 rounded-md hover:bg-orange border-2 hover:border-transparent border-orange"
    
    return (
            <button
                className={className === null ? fullButton : className === "outline" ? outlineButton : className}
                onClick={onClick}
                type={type}
            >
                {text}
            </button>
    )
}

export default BasicButton