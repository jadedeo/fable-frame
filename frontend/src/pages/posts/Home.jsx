import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import {
    getProjects,
    createProject,
} from "../../controllers/projectsController";
import { PostContext } from "../../contexts/PostContext";
import Post from "../../components/Post";
import Project from "../../components/ProjectCard";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading";
import { Modal, Button } from "@mantine/core";
import ProjectForm from "../../components/ProjectForm";

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
                subtitle={"You can't edit a blank page."}
            />

            <div className="mt-10 flex flex-col gap-10">
                {/* <div className="mx-5 flex justify-between items-center">
                    <h2 className="font-bold text-xl">projects</h2>

                    <i
                        className="fa-solid fa-plus cursor-pointer"
                        onClick={() => {
                            setOpen(true);
                        }}
                    ></i>
                </div> */}

                {loading && (
                    <div className="w-full flex items-center justify-center">
                        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
                    </div>
                )}

                {projects && (
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {projects.map((project) => (
                            <Link
                                key={project._id}
                                to={`/projects/${project._id}`}
                            >
                                <Project project={project} />
                            </Link>
                        ))}
                        <div
                            className="card w-full h-[50%] md:h-full md:w-[20%] flex items-center justify-center text-2xl justify-self-start cursor-pointer"
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
