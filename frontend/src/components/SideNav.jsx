import { useContext, useState, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate, useParams, Link } from "react-router-dom";
import { getProject } from "../controllers/projectsController";
import { getProjectCharacters } from "../controllers/charactersController";

import logo from "../assets/fableframelogo.png"; // Adjust path as needed

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
                        .slice(0, 5);

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
    }, [projectId]);

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
        <section className="px-2 py-0 h-full flex flex-col justify-between bg-white">
            <div className="flex flex-col gap-5">
                <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    {/* <div className="w-full h-20 bg-neutral-500"></div> */}
                    <img
                        src={logo}
                        className="absolute left-[55px] top-[25px] h-[150px]"
                    />
                </div>

                <div className="mt-[125px] px-2 text-center">
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

                            <p className="text-xs">{project?.name}</p>
                            <br></br>

                            <div>
                                <p className="text-xs text-neutral-400">
                                    CHARACTERS
                                </p>
                                {topCharacters?.map((character) => (
                                    <Link
                                        to={`/projects/${projectId}/characters/${character._id}`}
                                        key={character._id}
                                        className="block hover:underline line-clamp-1 text-ellipsis text-xs"
                                    >
                                        {character.name}
                                    </Link>
                                ))}

                                <br></br>
                            </div>
                            <div>
                                <p className="text-xs text-neutral-400">
                                    SETTINGS
                                </p>

                                <p className="text-xs">Coming soon...</p>
                                <br></br>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="mb-4 px-2 flex gap-1 justify-center">
                <button onClick={handleLogout} className="cursor-pointer">
                    <small className="text-neutral-400">ABOUT</small>
                </button>
                <button onClick={handleLogout} className="cursor-pointer">
                    <small>LOGOUT</small>
                </button>
            </div>
        </section>
    );
};

export default SideNav;
