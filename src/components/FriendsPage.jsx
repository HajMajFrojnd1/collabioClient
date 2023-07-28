import FriendList from "./FriendList"
import FriendRequests from "./FriendRequests"
import FriendsNav from "./FriendsNav"
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import{addFriendRequest, deleteFriendRequest, fetchFriends, acceptFriendRequest} from "../serverConections/friends"
import { emialRegex } from "../utils/regexes"
import { useToken } from "../utils/customHooks/useToken"

const RequestInformation = ({title, information}) => {
    return(
        <div className="flex flex-col text-xl gap-y-2 items-center">
            <span className="opacity-75">
                {title}
            </span>
            <span className="bg-mainDark rounded-md p-2 font-large font-bold text-4xl">
                {information}
            </span>
        </div>
    );
}

const RequestInformationWidget = ({titles, informations}) => {

    return(
        <div className="bg-main w-full p-4 rounded-md justify-start flex gap-x-8 justify-center">
            {
                titles.map((title, idx) => <RequestInformation title={title} information={informations[idx]}/>)
            }
        </div>
    );

};

const FriendsPage = () => {

    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [myRequests, setMyRequests] = useState([]);

    const token = useToken();

    const getFriends = async () => {
        try {
            const response = fetchFriends(token);

            console.log(response);

            return;

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {friends, myFriendRequests, pendingFriendRequests} = await response.json();

            setFriends(friends);
            setPendingRequests(pendingFriendRequests);
            setMyRequests(myFriendRequests);

        } catch (error) {
            console.error(error);
        }
    }

    const acceptFriend = async (requestId) => {

        try {
            const response = await acceptFriendRequest(token, requestId);

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {message, friendRequest} = await response.json();

            console.log(message);

            setFriends((_friends) => {
                _friends.push(friendRequest);
                return _friends;
            });

        } catch (error) {
            console.error(error);
        }

    }

    const deleteFriend = async (requestId,setFunc) => {
        try {
            const response = await deleteFriendRequest(token, requestId);

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {message} = await response.json();

            console.log(message);

            setFunc((_friends) => _friends.filter((value) => {
                return value._id === requestId;
            }));

        } catch (error) {
            console.error(error);
        }
    }

    const addFriend = async (email) => {
        
        if(!email.test(emialRegex));
        
        try {
            const response = await addFriendRequest(email, token);

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {friendRequest} = await response.json();

            setMyRequests((_friends) => {
                _friends.push(friendRequest);
                return _friends;
            });

        } catch (error) {
            console.error(error);   
        }
    }

    useEffect(() => {
        getFriends();
    }, [])
    

    return (
        <div className="relative flex-1 p-4 flex gap-4 bg-mainShade rounded-md text-white">
            <FriendsNav/>
            <div className="flex-1 flex flex-col gap-y-4">
                <RequestInformationWidget
                    titles={[
                        "My requests",
                        "Pending Requests",
                        "Friends"
                    ]}
                    informations={[
                        myRequests.length,
                        pendingRequests.length,
                        friends.length
                    ]}
                />
                <Routes>
                    <Route
                        path=""
                        element={<FriendList/>}
                    />
                    <Route
                        path="friendRequests"
                        element={<FriendRequests
                            
                        />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default FriendsPage