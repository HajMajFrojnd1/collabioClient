const RequestButton = ({name, src, alt, onClick, rotate = false}) => {
    return (
        <button
            className='svg bg-main p-2 rounded-md flex gap-x-4 items-center hover:text-orange'
            onClick={onClick}
        >
            {name}
            <img
                src={src}
                alt={alt}
                className={rotate === true ? "h-4 rotate-45" : "h-4"}
            />
        </button>
    );
}

export default RequestButton;