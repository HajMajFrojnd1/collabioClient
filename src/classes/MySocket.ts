import { Socket, io } from "socket.io-client";

const basicSocketPath: string = "http://localhost:4001/socket";
const defaultSettings = {
    port: 4001,
    transports: ['websocket'],
};

class MySocket {

    protected socket: Socket;

    constructor(socket: Socket){
        this.socket = socket;
        this.socket.on("connect_error", (e) => {
            console.log(e);
        });
    };

    static createSocket(path: string): MySocket {
        return new MySocket(io(`${basicSocketPath}/${path}`, defaultSettings));
    }

    public getSocket(): Socket{
        return this.socket;
    };

    public disconnect(): void{
        this.socket.removeAllListeners();
        this.socket.disconnect();
    };
}

export{MySocket, basicSocketPath, defaultSettings};