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

export { getProjects, getProject };
