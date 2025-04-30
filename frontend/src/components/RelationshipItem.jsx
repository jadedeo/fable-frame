import { Badge } from "@mantine/core";
const RelationshipItem = ({ relationship, onEdit, onDelete }) => {
    return (
        <div className="flex gap-5 hover:bg-gray-100 p-3">
            <div className="h-15 w-15 bg-gray-500"></div>
            <div className="w-full">
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
                    <div className="flex gap-3 items-start">
                        <i
                            className="fa-solid fa-pencil cursor-pointer"
                            onClick={onEdit}
                        ></i>
                        <i
                            className="fa-solid fa-trash-can cursor-pointer"
                            onClick={onDelete}
                        ></i>
                    </div>
                </div>

                <p>{relationship.description}</p>
            </div>
        </div>
    );
};

export default RelationshipItem;
