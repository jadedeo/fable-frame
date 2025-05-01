/** Get all projects */
const getProjects = async () => {
    const res = await fetch("/api/projects", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }

    return data;
};

/** Get project */
const getProject = async (projectId) => {
    const res = await fetch(`/api/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

/** Create project */
const createProject = async (projectData) => {
    if (!projectData.name) {
        throw Error("Project name is required");
    }

    const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ projectData }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

/** Update project */
const updateProject = async (projectId, projectData) => {
    if (!projectData.name) {
        throw Error("Project name is required");
    }

    const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(projectData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

/** Delete project */
const deleteProject = async (projectId) => {
    const res = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
