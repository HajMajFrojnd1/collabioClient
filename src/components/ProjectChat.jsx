import { useEffect, useState } from "react"
import { registerChatEvents } from "../sockets/projectSocketEvents";

const Message = ({message}) => {

    if (message.type === "connect" || message.type === "disconnect") {
        return (
            <span className="text-sm opacity-75">
                {message.user.fullName}
            </span>
        )
    }

    if (message.type === "message"){
        return(
            <div className="flex items-start w-full flex-col">
                <div className="flex items-center gap-x-2 mb-1 opacity-75">
                        <span className="text-sm">
                            {message.user.fullName}
                        </span>
                        <span className="text-xs">
                            17:59:32
                        </span>
                    </div>
                <span className="bg-main p-2 rounded-md break-words">
                    {message.message}
                </span>
            </div>
        );
    }
    
    return(
        <div className="flex items-end w-full flex-col">
            <span className="bg-orange p-2 rounded-md break-words">
                {message}
            </span>
        </div>
    );
}
//div div div div div div div div div div div div div div div div
const ChatMessages = ({messages}) => {

    return(
        <div className="flex flex-col flex-1 gap-y-2 justify-end items-start">
            {
                messages.map((message) => <Message message={message}/>)
            }
        </div>
    );
};

const ChatInput = ({updateChatMessage}) => {
    const [text, setText] = useState("");

    return(
        <div className="flex gap-x-2 w-full">
            <input 
                className="w-full rounded-md border-orange border-2 bg-main px-2"
                type="text"
                value={text}
                onChange={(e) => {setText(e.target.value)}}
            />
            <div 
                className="cursor-pointer flex items-center justify-center rounded-md border-orange border-2 bg-main p-2"
                onClick={()=>{
                    setText("");
                    updateChatMessage(text);
                }}
            >
                <img 
                    className="h-4 w-4"
                    src="/icons/paper-plane-solid.svg" 
                    alt="Send message icon"
                />
            </div>
        </div>
    );
};

const ChatWindow = ({isConnected, chatMessages, updateChatMessage}) => {

    if(!isConnected){
        return(
            <div className="bg-mainShade h-96 border-orange border-x-2 flex flex-col items-center justify-center">
                <span className="text-error font-large font-bold text-xl text-center">
                    Cannot connect <br/> to chat room
                </span>
            </div>
        )
    }

    return(
        <div className="bg-mainShade h-96 border-orange border-x-2 flex flex-col justify-between p-4 gap-y-4">
            <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar flex-col-reverse">
                <ChatMessages
                    messages={chatMessages}
                />
            </div>
            <ChatInput
                updateChatMessage={updateChatMessage}
            />
        </div>
    )
}

const ProjectChat = ({isConnected, socket}) => {

    const [isOpened, setIsOpened] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);

    const updateChatMessage = (message) => {
        setChatMessages((chatMessages) => [...chatMessages,message]);
    }

    const updateChatOthers = (message) => {
        socket.emit("chatMessage", message);
        setChatMessages((chatMessages) => [...chatMessages,message]);
    }

    useEffect(() => {
        if(socket){
            registerChatEvents(socket, updateChatMessage);
        }
    }, [socket]);

  return (
      <>
          {isOpened
              ?
              <div className="flex flex-col z-1000 fixed bottom-0 right-16 w-80 max:w-80">
                <div 
                    className="w-full justify-center cursor-pointer flex items-center gap-x-4 bg-main border-orange border-2 border-b-0 px-4 py-2 rounded-t-md"
                    onClick={() => setIsOpened(false)}
                >
                    <span>Close Project Chat</span>
                    {isConnected ? <div className="p-1 bg-success rounded-full"></div> : <div className="p-1 bg-error rounded-full"></div>}
                    <img src="/icons/chevron-left-solid.svg" alt="" className="h-4 w-4 -rotate-90" />
                </div>
                <ChatWindow
                    isConnected={isConnected}
                    chatMessages={chatMessages}
                    updateChatMessage={updateChatOthers}
                />
              </div>
              :
              <div
                  className="w-80 justify-center cursor-pointer flex items-center fixed gap-x-4 bottom-0 right-16 bg-main border-orange border-2 border-b-0 px-4 py-2 z-1000 rounded-t-md"
                  onClick={() => setIsOpened(true)}
              >                  
                  <span>Open Project Chat</span>
                  {isConnected ? <div className="p-1 bg-success rounded-full"></div> : <div className="p-1 bg-error rounded-full"></div>}
                  <img src="/icons/chevron-left-solid.svg" alt="" className="h-4 w-4 rotate-90" />
              </div>
          }
    </>
  )
}

export default ProjectChat