const registerChatEvents = (socket, updateMethod) => {
    socket.on("userConnected", (serverEmit) => {
        updateMethod({
            type: "connect",
            user: serverEmit.user
        })
    });

    socket.on("userDisconnected", (serverEmit) => {
        updateMethod({
            type: "disconnect",
            user: serverEmit.user
        })
    });

    socket.on("chatMessage", (serverEmit) => {
        updateMethod({
            type: "message",
            user: serverEmit.user,
            message: serverEmit.message,
            timestamp: serverEmit.timestamp
        })
    });
}

export {registerChatEvents};