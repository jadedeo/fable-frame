import { Badge } from "@mantine/core";
const BiographyItem = ({ event, onEdit, onDelete }) => {
    return (
        <div className="w-full flex gap-3 hover:bg-gray-100 p-3">
            {/* <div className="flex relative">
                <div className="h-5 w-5 rounded-full bg-gray-500 z-10"></div>
                <div className="h-full w-0.5 bg-gray-300 absolute ml-2"></div>
            </div> */}
            <div className="flex flex-col gap-3 items-start w-full">
                <div className="flex justify-between w-full">
                    <div>
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

                <p>{event.description}</p>
            </div>
        </div>
    );
};

export default BiographyItem;
