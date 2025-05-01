import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProject } from "../controllers/projectsController";
import { getProjectCharacters } from "../controllers/charactersController";

import logo from "../assets/fableframelogo.png";

const SideNav = () => {
    const { user, setUser } = useContext(UserContext);
    const { projectId } = useParams();

    const [project, setProject] = useState(null);
    const [topCharacters, setTopCharacters] = useState([]);

    // use navigate hoook
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (projectId) {
                try {
                    const projectData = await getProject(projectId);
                    setProject(projectData.project);

                    const characterData = await getProjectCharacters(projectId);
                    const sortedCharacters = characterData.projectCharacters
                        .sort(
                            (a, b) =>
                                new Date(b.updatedAt) - new Date(a.updatedAt)
                        )
                        .slice(0, 3);

                    console.log("*****************");
                    console.log(projectData);
                    console.log(sortedCharacters);
                    console.log("*****************");

                    setTopCharacters(sortedCharacters);
                } catch (error) {
                    console.error("Sidebar fetch error:", error);
                }
            }
        };

        fetchData();
    }, [projectId, project]);

    const handleLogout = () => {
        if (confirm("Confirm Logout?")) {
            console.log("logout");
            setUser({ email: null, posts: [] });
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    return (
        <section className="px-2 py-0 h-full flex flex-col justify-between relative">
            <div className="flex flex-col gap-5">
                <div
                    className="flex gap-3 items-center cursor-pointer relative overflow-visible"
                    onClick={() => navigate("/")}
                >
                    <img
                        src={logo}
                        className="h-[150px] w-auto absolute left-1/2 -translate-x-1/2 top-[-30px]"
                    />
                </div>

                <div className="mt-[110px] px-2 text-center">
                    <hr className="mt-2 mb-5" />

                    <Link to={`/`}>
                        <p className="text-xs text-neutral-400 hover:underline cursor-pointer">
                            ALL PROJECTS
                        </p>
                    </Link>

                    {projectId && (
                        <>
                            <hr className="my-5" />
                            <p className="uppercase text-xs text-neutral-400">
                                this project
                            </p>

                            <Link
                                to={`/projects/${projectId}`}
                                className="block hover:underline text-ellipsis text-xs"
                            >
                                {project?.name}
                            </Link>
                            <br></br>

                            <div>
                                <p className="uppercase text-xs text-neutral-400">
                                    RECENT CHARACTERS
                                </p>
                                <div className="flex flex-col gap-1">
                                    {topCharacters?.map((character) => (
                                        <Link
                                            to={`/projects/${projectId}/characters/${character._id}`}
                                            key={character._id}
                                            className="block hover:underline line-clamp-1 text-ellipsis text-xs"
                                        >
                                            {character.name}
                                        </Link>
                                    ))}
                                </div>

                                <br></br>
                            </div>
                            <div>
                                <p className="uppercase text-xs text-neutral-400">
                                    RECENT SETTINGS
                                </p>

                                <p className="text-xs text-neutral-300">
                                    Coming soon...
                                </p>
                                <br></br>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="mb-4 px-2 flex flex-col  justify-center">
                <button className="cursor-pointer">
                    <small className="hover:underline text-neutral-400">
                        ABOUT
                    </small>
                </button>
                <button
                    onClick={handleLogout}
                    className="hover:underline cursor-pointer"
                >
                    <small>LOGOUT</small>
                </button>
            </div>
        </section>
    );
};

export default SideNav;
