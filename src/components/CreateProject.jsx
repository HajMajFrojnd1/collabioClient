import { useState } from "react";
import BasicButton from "./BasicButton";
import SectionWrapper from "./SectionWrapper";
import { createProject } from "../serverConections/projects";
import { useNavigate } from "react-router-dom";
import VerticalFormInput from "./VerticalFormInput";

const ProjectForm = ({handleSubmit}) => {

	const [privacy, setPrivacy] = useState("public");
	const [name, setName] = useState("");
	const [errorMessage, seterrorMessage] = useState("");

	return (
		<form 
			action=""
			className="flex flex-col gap-y-4 items-center "
			onSubmit={async (e) => {
				e.preventDefault();
				const message = await handleSubmit(name, privacy);
				seterrorMessage(message);
			}}
		>
			<div className="flex gap-x-4 items-end">
				<VerticalFormInput
					type={"text"}
					name={"Project Name"}
					placeholder={"Name of project"}
					value={name}
					setValue={setName}
				/>
				<VerticalFormInput
					name={"Project privacy"}
					placeholder={"Name of project"}
					options={["public", "private"]}
					value={privacy}
					setValue={setPrivacy}
				/>
				<BasicButton
					text={"Create Project"}
					type={"submit"}
				/>
			</div>
			{	errorMessage.length > 0 ?
					<span className="font-normal text-error">{errorMessage}</span>
				:
					privacy === "public" &&
					<span className="font-normal text-error">Public projects are accesible from users profile</span>
			}

		</form>
	);
}

const CreateProject = ({token}) => {

	const navigation = useNavigate();

	const handleCreateProject = async (projectName, privacy) => {

		if(projectName.length < 3) return "Project name must be at least 3 characters long.";

		try {
			const response = await createProject(projectName, privacy, token);
	
			if(!response.ok){
				const {message} = await response.json();
				console.log(message);
				return message;
			}

			const {project, message} = await response.json();

			navigation("/projects/"+project._id, {state: {project: project}});

			return "";

		} catch (error) {
			console.error(error);
			return error;
		}

	}

	return (
		<div className="flex flex-col items-start gap-y-4 rounded-md bg-main p-4">
			<SectionWrapper name={"Create Project"}>
				<ProjectForm
					handleSubmit={handleCreateProject}
				/>
			</SectionWrapper>
		</div>
	);
}

export default CreateProject;