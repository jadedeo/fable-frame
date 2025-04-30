const Project = ({ project }) => {
    return (
        <div className="card w-full flex flex-col gap-2 hover:cursor-pointer hover:inset-sahdow-md hover:inset-shadow-gray-300 hover:shadow-none">
            <h2 className="font-bold text-lg">{project.name}</h2>
            <p className="line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                libero dui, tincidunt vel porttitor et, elementum sit amet
                ligula. Nunc rutrum lacus vitae dapibus tempus. Maecenas
                venenatis diam sit amet urna eleifend, a euismod orci tempus.
                Etiam sed ultricies erat. Donec eget libero dui. Nam malesuada,
                orci sed consectetur molestie, diam felis ultrices dui, vel
                feugiat odio leo et lectus. Vestibulum pulvinar odio et sapien
                egestas dignissim. Nunc varius tempor purus eu aliquet. Sed
                tristique, metus nec mollis luctus, nibh urna tempor ligula, in
                imperdiet nunc ligula sit amet mi. Nulla bibendum odio id rutrum
                posuere.
            </p>
            <div className="flex gap-2">
                <small className="text-gray-400">
                    Last Updated:
                    {new Date(project.updatedAt).toLocaleDateString()}
                </small>
                <small className="text-gray-400">
                    Created:
                    {new Date(project.createdAt).toLocaleDateString()}
                </small>
            </div>
        </div>
    );
};

export default Project;
