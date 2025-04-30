import { getProjectCharacters } from "../controllers/charactersController";
import { getProject } from "../controllers/projectsController";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import Character from "../components/Character";
import Heading from "../components/Heading";

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [characters, setCharacters] = useState([]);
    const [project, setProject] = useState({});

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

    return (
        <div className="h-full">
            <Heading title={"[project name]"} subtitle={"[subtitle here]"} />

            <div className="mt-10 flex flex-col gap-10">
                <section className="mx-5 flex flex-col gap-5">
                    <div className="flex gap-3">
                        <i className="fa-solid fa-pencil"></i>
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                    <p>{project.description}</p>
                </section>

                {loading && (
                    <div className="w-full flex items-center justify-center">
                        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
                    </div>
                )}

                <section className="flex flex-col gap-5">
                    <div className="mx-5 flex justify-between items-center">
                        <h2 className="font-bold text-xl">characters</h2>
                        <Link to={"createCharacter"}>
                            <i className="fa-solid fa-plus cursor-pointer"></i>
                        </Link>
                    </div>
                    <div className="mx-5 grid grid-cols-3 gap-5">
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
