import { useEffect, useState } from "react";
import { useToken } from "../utils/customHooks/useToken";
import { getProjects } from "../serverConections/projects";
import { Routes, Route } from "react-router-dom";
import CreateProject from "./CreateProject";
import ProjectsOverview from "./ProjectsOverview";
import ProjectPage from "./ProjectPage";
import PageWrapper from "./PageWrapper";
import ProjectEditor from "./ProjectEditor";

const ProjectHome = () => {

	const token = useToken();
	const [myProjects, setMyProjects] = useState([]);

	const fetchProjects = async () => {

		try {
			
			const response = await getProjects(token);

			if(!response.ok){
				const {message} = await response.json();
				console.log(message);
			}

			const {message, myProjects, latestEdits} = await response.json();

			setMyProjects(myProjects);

		} catch (error) {
			console.error(error);
		}

	}

	useEffect(() => {
	  
		fetchProjects();
	
	}, [])

	return(
		<PageWrapper>
			<CreateProject
				token={token}
			/>
			<ProjectsOverview
				myProjects={myProjects}
				setProjects={setMyProjects}
			/>
		</PageWrapper>
	)
}

const ProjectsPage = () => {

	return (
		<Routes>
			<Route 
				path=""
				element={
					<ProjectHome/>
				}
			/>
			<Route
				path="/:projectId/edit"
				element={
					<ProjectEditor />
				}
			/>
			<Route 
				path="/:projectId"
				element={
					<ProjectPage/>
				}
			/>
		</Routes>
	)
}

export default ProjectsPage