import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import PageWrapper from "./PageWrapper";
import FileTree from "./FileTree";
import ProjectChat from "./ProjectChat";
import { connectProjectSocket, registerErrorEvent } from "../sockets/dynamicSockets";
import { useToken } from "../utils/customHooks/useToken";

const ProjectEditor = () => {

	const location = useLocation();
	const { projectId } = useParams();
	const [project, setProject] = useState(location.state?.project);
	const [socket, setSocket] = useState(null);
	const [isConnected, setIsConnected] = useState(true);
	const token = useToken();

	useEffect(() => {

		const dynamicIo = connectProjectSocket(projectId, token);
		registerErrorEvent(dynamicIo);
		setSocket(dynamicIo);

		return () => {
			dynamicIo.disconnect();
		};

	}, []);

	return (
		<PageWrapper>
			<div className="flex-1 flex gap-x-4">
				<FileTree
				/>
			</div>
			<ProjectChat
				socket={socket}
				isConnected={isConnected}
			/>
		</PageWrapper>
	)
}

export default ProjectEditor