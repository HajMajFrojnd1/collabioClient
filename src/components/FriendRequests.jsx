import { useState, useContext } from "react"
import { emialRegex } from "../utils/regexes";
import TokenContext from "../context/TokenContext"


const FriendRequest = ({type, information, handleDelete, handleAccept, handleDecline}) => {


    return(
            <div className='w-full bg-mainShade p-3 rounded-md flex items-center gap-x-4'>
                <div className='w-16 h-16 bg-white rounded-md'>
                {
                    //image
                }
                </div>
                <span className="font-medium text-xl">
                    patrikodlozilik@seznam.cz
                </span>
                <div className='flex flex-1 justify-end gap-x-2'>
                    {type === "pending" &&
                        <>
                            <button 
                                className='svg bg-main p-2 rounded-md flex gap-x-4 items-center hover:text-orange'
                                onClick={handleAccept}
                            >
                                Accpet
                                <img 
                                    src="/icons/plus-solid.svg" 
                                    alt="Accept friend request icon" 
                                    className='h-4'
                                />
                            </button>
                            <button 
                                className='svg bg-main p-2 rounded-md flex gap-x-4 items-center hover:text-orange'
                                onClick={handleDecline}
                            >
                                Decline
                                <img 
                                    src="/icons/plus-solid.svg" 
                                    alt="Decline friend request icon" 
                                    className='h-4 rotate-45'
                                />
                            </button>
                        </>
                    }
                    {type !== "pending" &&
                        <button 
                            className='svg bg-main p-2 rounded-md flex gap-x-4 items-center hover:text-orange'
                            onClick={handleDelete}
                        >
                            Delete
                            <img 
                                src="/icons/plus-solid.svg" 
                                alt="Delete friend request icon" 
                                className='h-4 rotate-45'
                            />
                        </button>
                    }
                </div>
            </div>
    )

}


const FriendRequests = ({addFriend}) => {

    const [friendSearch, setFriendSearch] = useState("");
    const [errorMessages, setErrorMessages] = useState([]);

    const token = useContext(TokenContext);

    const handleDelete = () => {

    }

    const handleAccept = () => {

    };

    const handleDecline = () => {
        
    }

    const handleSearchClick = (e) => {
        if(!friendSearch.match(emialRegex)){
            setErrorMessages(["Please enter valid email address fromat (example@email.com)."]);
            return;
        }
        
        //create request
        
        
        setErrorMessages([]);
    }

    return (
        <div className="flex flex-1 gap-x-4 overflow-y-hidden">
            <div className="flex-1 bg-main rounded-md p-4 flex flex-col gap-y-4">
                <div className='w-100 flex justify-between items-center pb-2 border-b-2'>
                    <span className='font-large font-bold'>Add friends</span>
                </div>
                <div className="flex gap-x-4">
                    <input 
                        type="text"
                        className="bg-mainShade p-2 rounded-md outline-0 flex-1"
                        placeholder="Email address"
                        value={friendSearch}
                        onChange={(e) => {
                            setFriendSearch(e.target.value);
                        }}
                    />
                    <button 
                        className="bg-orange p-2 rounded-md hover:bg-transparent border-2 border-transparent hover:border-orange"
                        onClick={handleSearchClick}
                    >
                        Add Friend
                    </button>
                </div>
                { 
                    errorMessages.map((errorMessage) => <span className="text-error text-center text-base">{errorMessage}</span>)
                }
                <div className='w-100 flex justify-between items-center pb-2 border-b-2'>
                    <span className='font-large font-bold'>Your requests</span>
                </div>
                <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar gap-y-4">
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                    <FriendRequest/>
                </div>
            </div>
            <div className="flex-1 bg-main rounded-md p-4 flex flex-col" >
                <div className='w-100 flex justify-between items-center pb-2 border-b-2'>
                    <span className='font-large font-bold'>Pending Requests</span>
                </div>
                <div className="flex flex-1 flex-col mt-4 overflow-y-auto no-scrollbar gap-y-4">
                    <FriendRequest type={"pending"}/>
                    <FriendRequest type={"pending"}/>
                    <FriendRequest type={"pending"}/>
                    <FriendRequest type={"pending"}/>
                    <FriendRequest type={"pending"}/>
                    <FriendRequest type={"pending"}/>
                    <FriendRequest type={"pending"}/>
                    <FriendRequest type={"pending"}/>
                </div>
            </div>
        </div>
    )
}

export default FriendRequests