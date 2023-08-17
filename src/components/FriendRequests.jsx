import { useState, useContext } from "react"
import TokenContext from "../context/TokenContext"
import { deleteFriendRequest } from "../serverConections/friends";
import SectionWrapper from "./SectionWrapper";
import BasicButton from "./BasicButton";

const FriendRequest = ({type, request, handleDelete, handleAccept, setRequests}) => {

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

    return (
        <div className='w-full bg-mainShade p-3 rounded-md flex items-center gap-x-4'>
            <div className='w-16 h-16 bg-white rounded-md'>
                {
                    //image
                }
            </div>
            <span className="font-medium text-xl">
                {request.user.email}
            </span>
            <div className='flex flex-1 justify-end gap-x-2'>
                {type === "pending" &&
                    <>
                        <RequestButton
                            name={"Accept"}
                            src={"/icons/plus-solid.svg"}
                            alt={"Accept friend request icon"}
                            onClick={() => {
                                handleAccept(request._id);
                            }}
                        />
                        <RequestButton
                            name={"Decline"}
                            src={"/icons/plus-solid.svg"}
                            alt={"Decline friend request icon"}
                            onClick={() => {
                                handleDelete(request._id, setRequests);
                            }}
                            rotate={true}
                        />
                    </>
                }
                {type !== "pending" &&
                    <RequestButton
                        name={"Delete"}
                        src={"/icons/plus-solid.svg"}
                        alt={"Delete friend request icon"}
                        onClick={() => {
                            handleDelete(request._id, setRequests);
                        }}
                        rotate={true}
                    />
                }
            </div>
        </div>
    )

}


const FriendRequests = ({addFriend, deleteFriend, acceptFriend, friendRequests, pendingFriendRequests, setMyRequests, setPendingRequests}) => {
    
    const [errorMessages, setErrorMessages] = useState([]);
    
    const handleSearchClick = async (value) => {
        setErrorMessages(await addFriend(value));
    }

    const RequestMapper = ({type, requests, handleDelete, handleAccept, setRequests}) => {
        return (
            <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar gap-y-4">
                {
                    requests.map((request) => <FriendRequest type={type} request={request} handleAccept={handleAccept} handleDelete={handleDelete} setRequests={setRequests} />)
                }
            </div>
        );
    }
    
    const FriendSearch = ({handleClick}) => {
        const [value, setValue] = useState("")
        return (
            <div className="flex gap-x-4">
                <input
                    type="text"
                    className="bg-mainShade p-2 rounded-md outline-0 flex-1"
                    placeholder="Email address"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
                <BasicButton
                    text={"Add Friend"}
                    type={"button"}
                    onClick={()=>{handleClick(value);}}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-1 gap-x-4 overflow-y-hidden">
            <div className="flex-1 bg-main rounded-md p-4 flex flex-col gap-y-4">
                <SectionWrapper
                    name={"Add Friends"}
                >
                    <FriendSearch
                        handleClick={handleSearchClick}
                    />
                </SectionWrapper>
                {
                    errorMessages.map((errorMessage) => <span className="text-error text-center text-base">{errorMessage}</span>)
                }
                <SectionWrapper
                    name={"Your Requests"}
                >
                    <RequestMapper
                        requests={friendRequests}
                        handleDelete={deleteFriend}
                        handleAccept={acceptFriend}
                        setRequests={setMyRequests}
                    />
                </SectionWrapper>
            </div>
            <div className="flex-1 bg-main rounded-md p-4 flex flex-col" >
                <SectionWrapper
                    name={"Pending Requests"}
                >
                    <RequestMapper
                        requests={pendingFriendRequests}
                        type={"pending"}
                        handleDelete={deleteFriend}
                        handleAccept={acceptFriend}
                        setRequests={setMyRequests}
                    />
                </SectionWrapper>
            </div>
        </div>
    )
}

export default FriendRequests