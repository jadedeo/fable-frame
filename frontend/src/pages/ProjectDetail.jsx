import { getProjectCharacters } from "../controllers/charactersController";
import {
    getProject,
    updateProject,
    deleteProject,
} from "../controllers/projectsController";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import { Modal, Button } from "@mantine/core";

import { useState, useEffect } from "react";
import Character from "../components/Character";
import Heading from "../components/Heading";

const ProjectDetail = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [characters, setCharacters] = useState([]);
    const [project, setProject] = useState({});

    const [modalType, setModalType] = useState(null);
    const [open, setOpen] = useState(false);

    //loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await getProject(projectId);

                console.log("project:", data);
                setProject(data.project);

                // setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        const fetchCharacters = async () => {
            try {
                const data = await getProjectCharacters(projectId);

                console.log("project characters:", data);
                setCharacters(data.projectCharacters);

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProject();
        fetchCharacters();
    }, [projectId]);

    const handleDeleteProject = async () => {
        try {
            await deleteProject(projectId);
            navigate(`/`);
        } catch (error) {
            console.error("Error deleting character:", error);
        }
    };

    return (
        <div className="h-full">
            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                centered
                size="lg"
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                title={modalType === "edit" ? "Edit Project" : "Delete Project"}
            >
                {modalType === "edit" && (
                    <ProjectForm
                        initialData={project}
                        closeModal={() => setOpen(false)}
                        onUpdate={() => {
                            setOpen(false);
                            // Refetch project to update UI
                            getProject(projectId).then((data) =>
                                setProject(data.project)
                            );
                        }}
                    />
                )}
                {modalType === "delete" && (
                    <>
                        <p>
                            Are you sure you want to delete this project? It's
                            characters will be deleted as well.
                        </p>

                        <div className="flex justify-end gap-3 mt-5">
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteProject}>
                                Delete
                            </Button>
                        </div>
                    </>
                )}
            </Modal>

            <Heading title={project.name} />

            <div className="mt-10 flex flex-col gap-10">
                <section className="mx-5 flex flex-col gap-5">
                    <div className="flex gap-3">
                        <i
                            className="fa-solid fa-pencil"
                            onClick={() => {
                                setModalType("edit");
                                setOpen(true);
                            }}
                        ></i>
                        <i
                            className="fa-solid fa-trash-can"
                            onClick={() => {
                                setModalType("delete");
                                setOpen(true);
                            }}
                        ></i>
                    </div>
                    <p>{project.description}</p>
                </section>

                <section className="flex flex-col gap-5">
                    <div className="mx-5 flex justify-between items-center">
                        <h2 className="font-bold text-xl">characters</h2>
                        <Link to={"createCharacter"}>
                            <i className="fa-solid fa-plus cursor-pointer"></i>
                        </Link>
                    </div>
                    <div className="mx-5 grid grid-cols-2 gap-5">
                        {characters.length > 0 ? (
                            characters.map((character) => (
                                <Link
                                    key={character._id}
                                    to={`/projects/${projectId}/characters/${character._id}`}
                                >
                                    <Character
                                        key={character._id}
                                        character={character}
                                    />
                                </Link>
                            ))
                        ) : (
                            <p>This project has no characters yet.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ProjectDetail;
