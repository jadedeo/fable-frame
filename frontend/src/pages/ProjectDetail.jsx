import { getProjectCharacters } from "../controllers/charactersController";
import {
    getProject,
    updateProject,
    deleteProject,
} from "../controllers/projectsController";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ProjectForm from "../components/ProjectForm";
import { Modal, Button, Badge } from "@mantine/core";

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
        <div className="h-full overflow-scroll">
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

            <div className="mt-5 flex flex-col gap-5">
                <section className="p-5 flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <h6 className="uppercase text-neutral-400">tags</h6>
                        <div className="flex gap-1">
                            {project.tags?.map((tag, index) => {
                                return (
                                    <Badge key={index} color="gray">
                                        {tag}
                                    </Badge>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="p-5 flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <h6 className="uppercase text-neutral-400">
                            description
                        </h6>
                        <p>{project.description}</p>
                    </div>
                </section>

                <section className="flex flex-col gap-3 p-5">
                    {/* <div className="mx-5 flex justify-between items-center">
                        <h2 className="font-bold text-xl">characters</h2>
                        <Link to={"createCharacter"}>
                            <i className="fa-solid fa-plus cursor-pointer"></i>
                        </Link>
                    </div> */}
                    <h6 className="uppercase text-neutral-400">characters</h6>
                    <div className=" grid auto-rows-[1fr] grid-cols-1 md:grid-cols-2 gap-5">
                        <>
                            {characters.map((character) => (
                                <Link
                                    key={character._id}
                                    to={`/projects/${projectId}/characters/${character._id}`}
                                >
                                    <Character
                                        key={character._id}
                                        character={character}
                                    />
                                </Link>
                            ))}
                            <Link to={"createCharacter"}>
                                <div className="card bg-neutral-50 w-full h-full  flex items-center justify-center text-2xl justify-self-start cursor-pointer">
                                    <i className="fa-solid fa-plus "></i>
                                </div>
                            </Link>
                        </>
                    </div>
                </section>

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
            </div>
        </div>
    );
};

export default ProjectDetail;
