import { Badge } from "@mantine/core";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const BiographyTimeline = ({ biography }) => {
    return (
        <VerticalTimeline
            layout="1-column-left"
            lineColor="lightgray"
            className="!mx-0 !mt-3 !w-full !p-0"
        >
            {biography?.map((event, index) => {
                return (
                    <VerticalTimelineElement
                        key={index}
                        iconStyle={{
                            background: "lightgray",

                            // color: "#fff",
                        }}
                        date="start - end"
                    >
                        <div className="flex gap-3 items-center">
                            <h4 className="vertical-timeline-element-title font-bold">
                                {event.title}
                            </h4>
                            {event.tags.length > 0 &&
                                event.tags?.map((tag, index) => {
                                    return (
                                        <Badge key={index} color="gray">
                                            {tag}
                                        </Badge>
                                    );
                                })}
                        </div>
                        <p className="!mt-0">{event.description}</p>
                    </VerticalTimelineElement>
                );
            })}
        </VerticalTimeline>
    );
};

export default BiographyTimeline;
