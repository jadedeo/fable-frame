const Project = ({ project }) => {
    return (
        <div className="card w-full flex flex-col gap-2 hover:cursor-pointer hover:inset-sahdow-md hover:inset-shadow-neutral-300 hover:shadow-none">
            <h2 className="font-bold text-lg">{project.name}</h2>
            <p className="line-clamp-3">{project.description}</p>
            <div className="flex gap-2">
                <small className="text-neutral-400">
                    Last Updated:
                    {new Date(project.updatedAt).toLocaleDateString()}
                </small>
                <small className="text-neutral-400">
                    Created:
                    {new Date(project.createdAt).toLocaleDateString()}
                </small>
            </div>
        </div>
    );
};

export default Project;
