const fetchUrl = "http://localhost:4001/friends/";

const fetchFriends = (token) => {
    return fetch(
        fetchUrl,
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
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
            body: JSON.stringify({
                requestId: requestId,
                token: token
            })
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
            body: JSON.stringify({
                requestId: requestId,
                token: token
            })
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
            body: JSON.stringify({
                userEmail: email,
                token: token
            })
        }
    );
}

const fetchFriendsOnly = (projectId, token) => {
    return fetch(
        fetchUrl + "friendsOnly",
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                projectId: projectId
            })
        }
    );
}

export {addFriendRequest, deleteFriendRequest, fetchFriends, acceptFriendRequest, fetchFriendsOnly};