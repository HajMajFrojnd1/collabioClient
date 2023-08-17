import { Link } from "react-router-dom";


const ImageLink = ({className, imageSize, imageUrl, imageAlt, to, linkText = null, state = null}) => {

    const sizes = "w-" + imageSize + " h-" + imageSize;

    return (
        <Link 
            className={className}
            to={to}
            state={state}
        >
            {linkText && 
                <span>{linkText}</span>
            }
            <img 
                src={imageUrl} 
                alt={imageAlt}
                className={sizes}
            />
        </Link>
    )
}

export default ImageLink