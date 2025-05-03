import { useEffect, useState } from "react";

import { getProjects } from "../controllers/projectsController";
import ProjectCard from "../components/ProjectCard";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { Modal } from "@mantine/core";
import ProjectForm from "../components/ProjectForm";

const Home = () => {
    //project state
    const [projects, setProjects] = useState([]);

    //loading state
    const [loading, setLoading] = useState(true);

    const [modalType, setModalType] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        //can't make useEffect itself async so use setTimeout & make it's callback async instead
        setTimeout(async () => {
            //get all projects
            const data = await getProjects();
            console.log(data.userProjects);

            //update projects state
            setProjects(data.userProjects);

            //remove loading state
            setLoading(false);
        }, 500);
    }, []);

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
                title="Create New Project"
            >
                <ProjectForm
                    closeModal={() => setOpen(false)}
                    onUpdate={async () => {
                        setOpen(false);
                        // Refresh project list
                        const data = await getProjects();
                        setProjects(data.userProjects);
                    }}
                />
            </Modal>

            <Heading
                title={"Your Projects"}
                // subtitle={"You can't edit a blank page."}
            />

            <div className="mt-10 flex flex-col gap-10">
                {loading && (
                    <div className="w-full flex items-center justify-center mt-[200px]">
                        <i className="fa-solid fa-spinner text-neutral-500 animate-spin text-3xl text-center block"></i>
                    </div>
                )}

                {projects && !loading && (
                    <section className="grid auto-rows-[1fr] grid-cols-1 md:grid-cols-2 gap-5">
                        {projects.map((project) => (
                            <Link
                                key={project._id}
                                to={`/projects/${project._id}`}
                            >
                                <ProjectCard project={project} />
                            </Link>
                        ))}
                        <div
                            className="card bg-neutral-50 h-full w-full flex items-center justify-center text-2xl justify-self-start cursor-pointer"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            <i className="fa-solid fa-plus "></i>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Home;
