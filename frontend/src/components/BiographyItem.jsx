import { Badge } from "@mantine/core";
const BiographyItem = ({ event, onEdit, onDelete }) => {
    return (
        <div className="w-full flex gap-3 hover:bg-neutral-100 p-3">
            <div className="flex flex-col gap-3 items-start w-full">
                <div className="flex justify-between w-full">
                    <div className="flex gap-3 items-center">
                        <h3 className="font-bold text-md">{event.title}</h3>
                        <div className="flex gap-1">
                            {event.tags.map((tag, index) => {
                                return (
                                    <Badge key={index} size="sm" color="gray">
                                        {tag}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
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
                </div>

                <p>{event.description}</p>
            </div>
        </div>
    );
};

export default BiographyItem;
