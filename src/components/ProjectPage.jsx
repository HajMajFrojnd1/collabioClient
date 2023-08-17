import { useParams } from "react-router-dom"
import { getProject, addCollaborator, removeCollaborator } from "../serverConections/projects";
import { useState, useEffect } from "react";
import { useToken } from "../utils/customHooks/useToken";
import PageWrapper from "./PageWrapper";
import { formatProjectDate } from "../utils/dateUtils";
import BasicButton from "./BasicButton";
import DarkModal from "./DarkModal";
import TwoButtonModal from "./TwoButtonModal";
import VerticalFormInput from "./VerticalFormInput";
import { fetchFriendsOnly } from "../serverConections/friends";
import ImageLink from "./ImageLink";
import SectionWrapper from "./SectionWrapper";

const AddColaboratorModal = ({setVisible, projectId, setProject}) => {

    const [friends, setFriends] = useState(["No friends"]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [collaboratorRole, setCollaboratorRole] = useState("reader");

    const token = useToken();

    const getFriends = async () => {
        try {
            const response = await fetchFriendsOnly(projectId, token);

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {friends} = await response.json();

            setFriends(friends.map((friend) => friend.user.email));
            setSelectedFriend(friends[0].user.email);

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async () => {
        try {
            console.log(selectedFriend, collaboratorRole);
            const response = await addCollaborator(projectId, selectedFriend, collaboratorRole, token);

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {collaborator} = await response.json();

            setProject(project => {
                return{
                    ...project,
                    collaborators: [...project.collaborators,collaborator]
                }
            });

            setVisible((value) => !value);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        getFriends();
    },[]);

    const CollaboratorForm = ({selectedFriend, setSelectedFriend, collaboratorRole, setCollaboratorRole}) => {

        return(
            <div className="flex flex-1 flex-col gap-y-4">
                <VerticalFormInput
					name={"User"}
					placeholder={"Collaborator"}
                    options={friends}
					value={selectedFriend}
                    setValue={setSelectedFriend}
                />
                <VerticalFormInput
                    name={"User Permission"}
					placeholder={"Project Role"}
					options={["cowoner", "editor", "reader"]}
					value={collaboratorRole}
                    setValue={setCollaboratorRole}
                />
            </div>
        );
    };

    return(
        <DarkModal setVisible={setVisible}>
            <TwoButtonModal
                onClickOne={() => {
                    handleSubmit();
                }}
                onClickTwo={() => {
                    setVisible((value) => !value)
                }}
                textOne={"Add Collaborator"}
                textTwo={"Cancel"}
            >
                <CollaboratorForm
                    selectedFriend={selectedFriend}
                    setSelectedFriend={setSelectedFriend}
                    collaboratorRole={collaboratorRole}
                    setCollaboratorRole={setCollaboratorRole}
                />
            </TwoButtonModal>
        </DarkModal>
    );
}

const Collaborator = ({collaborator, currentUser, setProject, token}) => {
    const {user, role, project} = collaborator;
    const [visible, setVisible] = useState(false);

    const handleRemove = async () => {
        try {
            const response = await removeCollaborator(project, user._id, token);

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {message} = await response.json();

            console.log(message);
            setProject(project => {
                return{
                    ...project,
                    collaborators: project.collaborators.filter(collaborator => collaborator.user._id !== user._id)
                }
            });


        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div className="p-4 bg-mainShade w-full flex rounded-md flex-col gap-y-1 relative">
            <div className="flex gap-x-8 justify-between">
                <span className="text-sm opacity-50">{user.firstName + " " + user.lastName}</span>
                <span className="text-sm opacity-50">{role}</span>
            </div>
            <span className="font-bold font-large text-base">{user.email}</span>
            <div 
                className="bg-transparent hover:bg-mainShade flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-md"
                onMouseEnter={() => {
                    setVisible(true);
                }}
                onMouseLeave={() => {
                    setVisible(false);
                }}
            >
            {visible&& 
                <div className="flex gap-x-2">
                    <BasicButton
                        text={"Profile"}
                        type={"button"}
                    />
                    {(currentUser.role === "owner" || currentUser.role === "coowner") && role !== "owner" &&
                        <BasicButton
                            text={"Remove"}
                            type={"button"}
                            className={"outline"}
                            onClick={handleRemove}
                        />
                    }
                </div>
            }
            </div>
        </div>
    );
}

const CollaboratorList = ({project, setProject, token}) => {

    const [addVisibility, setAddVisibility] = useState(false);
    const [filterInput, setFilterInput] = useState("");

    const {user, collaborators} = project;

    return(
        <div className="h-full p-4 bg-main rounded-md flex flex-col gap-y-4">
            {addVisibility &&    
                <AddColaboratorModal
                    setVisible={setAddVisibility}
                    projectId={project._id}
                    setProject={setProject}
                />
            }
            {(user.role === "owner" || user.role === "coowner") &&
                <BasicButton
                    text={"Add Collaborator"}
                    type={"button"}
                    onClick={() => {
                        setAddVisibility((value) => !value);
                    }}
                />
            }
            <input
                type={"text"}
                value={filterInput}
                className="bg-mainShade p-2 rounded-md outline-0 min:w-64"
                placeholder={"name, email or user role"}
                onChange={(e) => {
                    setFilterInput(e.target.value);
                }}
                autoFocus={true}
            />
            {collaborators &&
                collaborators
                .filter((collaborator) => (
                    collaborator.role === filterInput 
                    || `${collaborator.user.firstName} ${collaborator.user.firstName}`.includes(filterInput)) 
                    || collaborator.user.email.includes(filterInput
                ))
                .map((collaborator) =><Collaborator collaborator={collaborator} currentUser={user} setProject={setProject} token={token}/>)
            }
        </div>
    );
}

const ProjectOverview = ({project}) => {
    
    const OverviewField = ({title, value}) => {

        return(
            <div className="bg-mainShade py-2 px-4 gap-2 flex flex-col items-center rounded-md border-2 border-orange">
                <span className="font-medium text-base">
                    {title}
                </span>
                <span className="font-bold font-large text-xl opacity-75">
                    {value}
                </span>
            </div>
        );
    }

    return(
        <div className="p-4 bg-main rounded-md flex flex-col items-center gap-y-4">
            <h2 className="font-large text-3xl font-bold">
                {project.name}
            </h2>
            <div className="flex gap-8 w-full justify-center">
                <OverviewField
                    title={"Owner"}
                    value={project.owner.firstName + " " + project.owner.lastName}
                />
                <OverviewField
                    title={"Privacy"}
                    value={project.privacy}
                />
                <OverviewField
                    title={"Created"}
                    value={formatProjectDate(project.timestamp)}
                />
                <OverviewField
                    title={"Collaborators"}
                    value={project.collaborators.length}
                />
            </div>
        </div>
    )
}

const ProjectActions = ({project, setProject}) => {

    const className = "svg hover:text-orange font-large font-bold bg-mainShade rounded-md px-4 py-4 flex gap-x-8 justify-between items-center";



    return(
        <div className="flex justify-between p-4 bg-main rounded-md w-full">
            <div className="flex">
                <ImageLink 
                    className={className}
                    imageUrl={"/icons/pen-to-square-solid.svg" }
                    imageAlt={"Home link icon"}
                    imageSize={"6"}
                    linkText={"Start editing project"}
                    to={`/projects/${project._id}/edit`}
                    state={{
                        project: project
                    }}
                />
            </div>
            {project.user.role === "owner" &&
                <button
                    onClick={() => {}}
                    className={className}
                >
                    <span>Settings</span>
                    <img
                        src="/icons/sliders-solid.svg"
                        alt="Project settings icon"
                        className="w-6 h-6 fill-white"
                    />
                </button>
            }
        </div>
    );
};

const LatesProjectEdits = ({project}) => {

    return (
        <div className="p-4 bg-main rounded-md">
            <SectionWrapper name={"Latest Edits"}>

            </SectionWrapper>
        </div>
    );
}

const ProjectMain = ({project, setProject}) => {

    return (
        <div className=" rounded-md flex flex-1 flex-col gap-y-4">
            <ProjectActions
                project={project}
                setProject={setProject}
            />
            <div className="grid grid-cols-2 gap-x-4 flex-1">
                <LatesProjectEdits
                    project={project}
                />
            </div>
        </div>
    );
}

const ProjectPage = () => {

    const {projectId} = useParams();
    const token = useToken();

    const [project, setProject] = useState(null);

    const fetchProject = async () => {
        try {
         
            const response = await getProject(projectId,token);

            if(!response.ok){
                const {message} = await response.json();
                console.log(message);
                return;
            }

            const {message, project} = await response.json();
            setProject(project);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {

        fetchProject();

    }, []);

    return (
        <PageWrapper>
            {project &&
                <>
                    <ProjectOverview
                        project={project}
                    />
                    <div className="flex-1 flex gap-x-4">
                        <ProjectMain
                            project={project}
                            setProject={setProject}
                        />
                        <CollaboratorList
                            project={project}
                            setProject={setProject}
                            token={token}
                        />
                    </div>
                </>
            }
        </PageWrapper>
    )
}

export default ProjectPage