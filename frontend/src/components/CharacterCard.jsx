import { Pill, Badge } from "@mantine/core";

const Character = ({ character }) => {
    return (
        <div className="card w-full h-full  flex hover:cursor-pointer hover:inset-sahdow-md hover:inset-shadow-neutral-300 hover:shadow-none">
            <div className="h-full w-35 bg-neutral-200 rounded-full"></div>
            <div className="w-full flex flex-col gap-2">
                <h2 className="font-bold text-lg">{character.name}</h2>
                <p className="line-clamp-3">{character.description}</p>
                {/* <div className="flex gap-2">
                <small className="text-neutral-400">
                    Last Updated:
                    {new Date(project.updatedAt).toLocaleDateString()}
                </small>
                <small className="text-neutral-400">
                    Created:
                    {new Date(project.createdAt).toLocaleDateString()}
                </small>
            </div> */}
                {character.role && (
                    <div className="flex gap-1">
                        {character.role.map((role, index) => {
                            return (
                                <Badge key={index} color="gray">
                                    {role}
                                </Badge>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Character;
