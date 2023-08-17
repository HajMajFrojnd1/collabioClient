import { io } from "socket.io-client";

const basicSocketPath = "http://localhost:4001/socket";

const connectProjectSocket = (projectId, token) => {
    return io(`${basicSocketPath}/project/${projectId}`, {
        port: 4001,
        transports: ['websocket'],
        auth: (cb) => {
            cb({
                token: token
            })
        }
    });
}

const registerErrorEvent = (socket) => {
    socket.on("connect_error", (e) => {
        console.log(e);
    });
};


export {connectProjectSocket, registerErrorEvent};