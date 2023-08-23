import { useEffect, useState, useCallback } from "react"
import { useLocation, useParams } from "react-router-dom"
import PageWrapper from "./PageWrapper";
import FileTree from "./FileTree";
import ProjectChat from "./ProjectChat";
import { useToken } from "../utils/customHooks/useToken";
import { ProjectSocket } from "../classes/ProjectSocket";

const ProjectEditor = () => {

	const location = useLocation();
	const { projectId } = useParams();
	const [project, setProject] = useState(location.state?.project);
	
	const [socket, setSocket] = useState(null);

	const [isConnected, setIsConnected] = useState(true);
	const [chatMessages, setChatMessages] = useState([]);
	
	const [fileTree, setfileTree] = useState([]);
	
	const token = useToken();

	const setFileStructure = useCallback((path, type) => {
		setfileTree((fileTree) => [...fileTree, path]);
		socket.emit("fileTreeAdd", {
			path: path, 
			type: type
		});
	}, [socket]);

    const updateChatMessage = (message) => {
        setChatMessages((chatMessages) => [...chatMessages,message]);
    }

	const updateChatOthers = useCallback((message) => {
		socket.emit("chatMessage", message);
		setChatMessages((chatMessages) => [...chatMessages,message]);
	}, [socket]);

	useEffect(() => {

		const dynamicIo = ProjectSocket.createDynamicSocket(projectId, token);
		dynamicIo.registerChatEvents(updateChatMessage);
		dynamicIo.registerFileTreeEvents(setfileTree);
		setSocket(dynamicIo.getSocket());

		return () => {
			dynamicIo.disconnect();
		};

	}, []);

	return (
		<PageWrapper>
			<div className="flex-1 flex gap-x-4">
				<FileTree
					fileTree={fileTree}
					setFileStructure={setFileStructure}
				/>
			</div>
			<ProjectChat
				chatMessages={chatMessages}
				updateChatMessage={updateChatOthers}
				isConnected={isConnected}
			/>
		</PageWrapper>
	)
}

export default ProjectEditor