import SectionWrapper from "./SectionWrapper";
import ProjectConatiner from "./ProjectContainer";

const ProjectWrapper = ({children, name}) => {
	return (	
		<div className="flex flex-col p-4 bg-mainShade flex-1 rounded-md gap-4">
			<SectionWrapper name={name}>
				{children}
			</SectionWrapper>
		</div>
	);
}

const ProjectsOverview = ({myProjects, setProjects}) => {
	return(
		<div className="flex rounded-md bg-main p-4 flex-1 gap-x-4">
			<ProjectWrapper name={"Your projects"}>
				{
					myProjects.map((project) => <ProjectConatiner project={project} dark={true} setProjects={setProjects}/>)
				}
			</ProjectWrapper>
			<ProjectWrapper name={"Latest Edits"}>

			</ProjectWrapper>
		</div>
	);
}

export default ProjectsOverview;