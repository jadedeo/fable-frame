import { Badge } from "@mantine/core";
const RelationshipItem = ({
    relationship,
    onEdit,
    onDelete,
    editable = true,
}) => {
    return (
        <div
            className={`flex p-3 ${
                !editable ? "card" : "hover:bg-neutral-100"
            }`}
        >
            <div className="h-15 w-15 bg-neutral-500"></div>
            <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between">
                    <div className="flex gap-3 items-center">
                        <h3 className="font-bold text-md">
                            {relationship.name}
                        </h3>
                        <div className="flex gap-1">
                            {relationship.type.map((type, index) => {
                                return (
                                    <Badge key={index} size="sm" color="gray">
                                        {type}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                    {editable && (
                        <div className="flex gap-3 items-start">
                            <small
                                className="underline cursor-pointer"
                                onClick={onEdit}
                            >
                                Edit
                            </small>
                            <small
                                className="underline cursor-pointer text-red-500"
                                onClick={onDelete}
                            >
                                Remove
                            </small>
                        </div>
                    )}
                </div>

                <p>{relationship.description}</p>
            </div>
        </div>
    );
};

export default RelationshipItem;
