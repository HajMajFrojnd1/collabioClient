const fetchUrl = "http://localhost:4001/projects/";

const createProject = (projectName, privacy, token) => {
    return fetch(
        fetchUrl,
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                projectName: projectName,
                privacy: privacy
            })
        }
    );
}

const getProjects = (token) => {
    return fetch(
        fetchUrl + "userProjects",
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token
            })
        }
    );
}

const getProject = (projectId, token) => {
    return fetch(
        fetchUrl + "project/" + projectId,
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                projectId: projectId
            })
        }
    );
}

const deleteProject = (projectId, token) => {
    return fetch(
        fetchUrl,
        {
            method: "DELETE",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                projectId: projectId
            })
        }
    );
}

const addCollaborator = (projectId, email, role, token) => {
    return fetch(
        fetchUrl + "addCollaborator",
        {
            method: "POST",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                email: email,
                projectId: projectId,
                role: role
            })
        }
    );
}

const removeCollaborator = (projectId, collaboratorId, token) => {
    return fetch(
        fetchUrl + "addCollaborator",
        {
            method: "delete",
            mode: "cors",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                collaboratorId: collaboratorId,
                projectId: projectId
            })
        }
    );
}



export {createProject, getProjects, deleteProject, getProject, addCollaborator, removeCollaborator};