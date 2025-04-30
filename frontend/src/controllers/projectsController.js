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

export { getProjects };
