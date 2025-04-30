import { getProjectCharacters } from "../controllers/charactersController";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import Character from "../components/Character";
import Heading from "../components/Heading";

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [characters, setCharacters] = useState([]);

    //loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const data = await getProjectCharacters(projectId);

                console.log("project chars", data);
                setCharacters(data.projectCharacters);

                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

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
                    <p>
                        PROJECT DESCRIPTION HERE Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Donec libero dui, tincidunt
                        vel porttitor et, elementum sit amet ligula. Nunc rutrum
                        lacus vitae dapibus tempus. Maecenas venenatis diam sit
                        amet urna eleifend, a euismod orci tempus. Etiam sed
                        ultricies erat. Donec eget libero dui. Nam malesuada,
                        orci sed consectetur molestie, diam felis ultrices dui,
                        vel feugiat odio leo et lectus.
                    </p>
                    <p>
                        PROJECT DESCRIPTION HERE Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Donec libero dui, tincidunt
                        vel porttitor et, elementum sit amet ligula. Nunc rutrum
                        lacus vitae dapibus tempus.
                    </p>
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
