const fetchUrl = "http://localhost:4001/friends";


const fetchFriends = (token) => {
    return fetch(
        fetchUrl + "",
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: {
                token: token
            }
        }
    );
}


const deleteFriendRequest = (token, requestId) => {
    return fetch(
        fetchUrl + "/friendRequests",
        {
            method: "DELETE",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: {
                requestId: requestId,
                token: token
            }
        }
    );
}

const acceptFriendRequest = (token, requestId) => {
    return fetch(
        fetchUrl + "/friendRequests",
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: {
                requestId: requestId,
                token: token
            }
        }
    );
}

const addFriendRequest = (token, email) => {
    return fetch(
        fetchUrl + "/sendRequest",
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: {
                email: email,
                token: token
            }
        }
    );
}

export {addFriendRequest, deleteFriendRequest, fetchFriends, acceptFriendRequest};