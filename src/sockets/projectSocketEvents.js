import chatMessageTypes from "../enums/chatMessageTypes";

const registerChatEvents = (socket, pushUpdateMethod) => {
    socket.on("userConnected", (serverEmit) => {
        console.log(serverEmit);
        pushUpdateMethod({
            type: chatMessageTypes.connect,
            user: serverEmit.user
        })
    });

    socket.on("userDisconnected", (serverEmit) => {
        pushUpdateMethod({
            type: chatMessageTypes.disconnect,
            user: serverEmit.user
        })
    });

    socket.on("chatMessage", (serverEmit) => {
        pushUpdateMethod({
            type: chatMessageTypes.message,
            user: serverEmit.user,
            message: serverEmit.message,
            timestamp: serverEmit.timestamp
        })
    });
}

const registerFileTreeEvents = (socket, pushUpdateMethod) => {
    socket.on("fileTreeChanged", (serverEmit) => {
        pushUpdateMethod(serverEmit);
    });
}

export {registerChatEvents};