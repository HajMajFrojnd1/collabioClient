import { Link } from 'react-router-dom'
import { useState } from 'react'
import DarkModal from './DarkModal'
import { deleteProject } from '../serverConections/projects'
import { useToken } from '../utils/customHooks/useToken'
import {formatProjectDate} from "../utils/dateUtils"
import TwoButtonModal from './TwoButtonModal'

const ProjectTextContainer = ({fTitle, fText, sTitle, sText}) => {

    return(
        <div className='flex flex-col items-start border-r-2 pr-4 border-white'>
                    <span className='opacity-75'>
                        {fTitle + ": " + fText}
                    </span>
                    <span className='opacity-75'>
                        {sTitle + ": " + sText}
                    </span>
        </div>
    )

}

const DeleteProjectModal = ({project, setProjects, setVisible}) => {

    const token = useToken();

    const handleDelete = async () => {
        try {
            const response = await deleteProject(project._id, token);

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {message} = await response.json();
            console.log(message);

            setProjects((projects) => projects.filter(_project => _project._id !== project._id));
            setVisible((value) => !value);

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <TwoButtonModal
            onClickOne={handleDelete}
            onClickTwo={() => {setVisible((value) => !value)}}
            textOne={"Delete Project"}
            textTwo={"Cancel"}
        >
            <span>Are you sure you want to delete project {project.name}?</span>
        </TwoButtonModal>
    );
}

const ProjectConatiner = ({project, setProjects, dark = false}) => {

    const [deleteModal, setDeleteModal] = useState(false);

    const darkTheme = 'w-full bg-main p-3 rounded-md flex items-center gap-x-4';
    const lightTheme = 'w-full bg-mainShade p-3 rounded-md flex items-center gap-x-4';
    const darkButton = "svg bg-mainShade p-2 rounded-md relative z-1";
    const lightButton = "svg bg-main p-2 rounded-md relative z-1";
    return (
        <div className='w-full flex flex-col text-white font-large text-base items-start'>
            <Link>
                {project.name}
            </Link>
            <div className={dark ? darkTheme : lightTheme}>
                
                <ProjectTextContainer
                    fTitle={"Owner"}
                    fText={project.owner.firstName + " " + project.owner.lastName}
                    sTitle={"Permission"}
                    sText={project.role}
                />
                <ProjectTextContainer
                    fTitle={"Privacy"}
                    fText={project.privacy}
                    sTitle={"Created"}
                    sText={formatProjectDate(project.timestamp)}
                />
                <div className='flex flex-1 justify-end gap-x-2'>
                    <Link 
                        className={dark ? darkButton : lightButton}
                        to={"/projects/"}
                    >
                        <img 
                            src="/icons/chart-column-solid.svg" 
                            alt="Project statistics icon" 
                            className='w-6 h6'
                        />
                    </Link>
                    <Link 
                        className={dark ? darkButton : lightButton}
                        to={"/projects/"  + project._id}
                    >
                        <img 
                            src="/icons/pen-to-square-solid.svg" 
                            alt="Edit project icon" 
                            className='w-6 h-6'
                        />
                    </Link>
                    { project.role === "owner" &&
                        <button 
                            className={dark ? darkButton : lightButton}
                            onClick={(e) => {
                                setDeleteModal((value) => !value);
                            }}
                        >
                            <img 
                            src="/icons/plus-solid.svg" 
                            alt="Edit project icon" 
                            className='w-6 h-6 rotate-45'
                        />
                        </button>
                    }
                    {deleteModal &&
                        <DarkModal setVisible={setDeleteModal}>
                            <DeleteProjectModal 
                                setProjects={setProjects}
                                setVisible={setDeleteModal}
                                project={project}
                            />
                        </DarkModal>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProjectConatiner;