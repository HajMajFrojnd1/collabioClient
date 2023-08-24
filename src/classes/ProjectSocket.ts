import { Socket, io } from "socket.io-client";
import {MySocket, basicSocketPath, defaultSettings} from "./MySocket";
import chatMessageTypes from "../enums/chatMessageTypes";

class ProjectSocket extends MySocket{

    constructor(socket: Socket){
        super(socket);
    };


    static createDynamicSocket(projectId: string | undefined, token: any): ProjectSocket {
        return new ProjectSocket(io(`${basicSocketPath}/project/${projectId}`, {
            ...defaultSettings,
            auth: (cb) => {
                cb({
                    token: token
                })
            }
        }));
    }

    public registerChatEvents(pushUpdateMethod: Function): void{
        this.socket.on("userConnected", (serverEmit) => {
            pushUpdateMethod({
                type: chatMessageTypes.connect,
                user: serverEmit.user
            })
        });
    
        this.socket.on("userDisconnected", (serverEmit) => {
            pushUpdateMethod({
                type: chatMessageTypes.disconnect,
                user: serverEmit.user
            })
        });
    
        this.socket.on("chatMessage", (serverEmit) => {
            pushUpdateMethod({
                type: chatMessageTypes.message,
                user: serverEmit.user,
                message: serverEmit.message,
                timestamp: serverEmit.timestamp
            })
        });
    };

    public registerFileTreeEvents(updateMethod: Function): void{
        this.socket.on("fileTree", (serverEmit) => {
            updateMethod(serverEmit);
        });
    };
    
    public removeChatEvents(): void{
        this.socket.off("userConnected");
        this.socket.off("userDisconnected");
        this.socket.off("chatMessage");
    }

    public removeFileTreeEvents(): void{
        this.socket.off("fileTreeChanged");
    }

}

export {ProjectSocket};