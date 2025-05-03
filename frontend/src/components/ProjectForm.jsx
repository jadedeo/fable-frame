import { useState, useEffect } from "react";
import { TextInput, Textarea, Button } from "@mantine/core";
import {
    updateProject,
    createProject,
} from "../controllers/projectsController";
import { useParams } from "react-router-dom";
import MultiSelectCreatable from "../components/MultiSelectCreatable";

const ProjectForm = ({ initialData, closeModal, onUpdate }) => {
    const { projectId } = useParams();

    const [projectData, setProjectData] = useState({
        name: "",
        tags: [],
        description: "",
    });

    useEffect(() => {
        if (initialData) {
            setProjectData({
                name: initialData.name || "",
                tags: initialData.tags || [],
                description: initialData.description || "",
            });
        }
    }, [initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (initialData) {
                console.log("update project", projectData);
                await updateProject(initialData._id, projectData);
            } else {
                await createProject(projectData);
            }

            if (onUpdate) {
                onUpdate();
            }
            closeModal();
        } catch (err) {
            console.error("Error saving project:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextInput
                label="Project Name"
                value={projectData.name}
                onChange={(e) =>
                    setProjectData({
                        ...projectData,
                        name: e.currentTarget.value,
                    })
                }
                required
            />

            <MultiSelectCreatable
                defaultVals={[
                    "Fantasy",
                    "Contemporary Fiction",
                    "Science Fiction",
                    "Historical Fiction",
                    "Romantasy",
                ]}
                value={projectData.tags}
                onChange={(newTags) =>
                    setProjectData({
                        ...projectData,
                        tags: newTags,
                    })
                }
                placeholder="Pick or add tags"
                label="Tags"
            />
            <Textarea
                label="Description"
                onChange={(e) =>
                    setProjectData({
                        ...projectData,
                        description: e.currentTarget.value,
                    })
                }
                minRows={5}
                autosize
            />
            <div className="flex justify-end gap-2">
                <Button variant="outline" color="gray" onClick={closeModal}>
                    Cancel
                </Button>
                <Button type="submit" color="gray">
                    Save
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;
