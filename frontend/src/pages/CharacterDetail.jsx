import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getCharacter,
    deleteCharacter,
} from "../controllers/charactersController";
import CharacterForm from "../components/CharacterForm";
import { Modal, Button, Pill, Badge } from "@mantine/core";
import RelationshipItem from "../components/RelationshipItem";
import BiographyTimeline from "../components/BiographyTimeline";

const CharacterDetail = () => {
    const navigate = useNavigate();

    const { projectId } = useParams();
    const { characterId } = useParams();
    const [character, setCharacter] = useState([]);
    //loading state
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const fetchCharacterData = async () => {
        try {
            const data = await getCharacter(projectId, characterId);
            console.log("char data", data.character);
            setCharacter(data.character);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCharacter = async () => {
        try {
            await deleteCharacter(projectId, characterId);
            navigate(`/projects/${projectId}`);
        } catch (error) {
            console.error("Error deleting character:", error);
        }
    };

    const handleDoneEditing = () => {
        setIsEditing(false);
        fetchCharacterData();
    };

    useEffect(() => {
        fetchCharacterData();
    }, [characterId]);

    console.log("Image path:", character.image);

    return (
        <div className="h-full overflow-scroll relative">
            {!isEditing && (
                <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
                    <button
                        className="w-12 h-12 rounded-full bg-neutral-400 hover:bg-neutral-500 flex items-center justify-center shadow-lg"
                        onClick={() => setDeleteModalOpen(true)}
                        title="Delete character"
                    >
                        <i className="fa-solid fa-trash-can text-white"></i>
                    </button>
                    <button
                        className="w-12 h-12 rounded-full bg-neutral-600 hover:bg-neutral-700 flex items-center justify-center shadow-lg"
                        onClick={() => setIsEditing(true)}
                        title="Edit character"
                    >
                        <i className="fa-solid fa-pencil text-white text-lg"></i>
                    </button>
                </div>
            )}

            {/* <p>isEditing: {isEditing ? "true" : "false"}</p> */}

            <div className="flex flex-col">
                {loading && (
                    <div className="w-full flex items-center justify-center mt-[200px]">
                        <i className="fa-solid fa-spinner text-neutral-500 animate-spin text-3xl text-center block"></i>
                    </div>
                )}

                {isEditing && (
                    <CharacterForm
                        character={character}
                        isEditing={isEditing}
                        onDoneEditing={handleDoneEditing}
                    />
                )}
            </div>

            {/* VIEWING ONLY */}
            {!isEditing && (
                <>
                    <div className="flex gap-10 pb-5 px-5">
                        <section className="flex flex-col gap-5 card w-full">
                            <h1 className="font-bold text-3xl">
                                {character.name}
                            </h1>
                            {character.description ? (
                                <p className="">{character.description}</p>
                            ) : (
                                <p>---</p>
                            )}

                            <section className="grid grid-cols-[5fr,6fr] gap-x-5 gap-y-3">
                                <div>
                                    <h6 className="text-neutral-400">
                                        ALIASES
                                    </h6>
                                    <div className="flex flex-wrap gap-1">
                                        {character.aliases?.length > 0 ? (
                                            character.aliases?.map(
                                                (alias, index) => {
                                                    return (
                                                        <Badge
                                                            key={index}
                                                            color="gray"
                                                        >
                                                            {alias}
                                                        </Badge>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <p>---</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h6 className="text-neutral-400">ROLE</h6>
                                    <div className="flex flex-wrap gap-1">
                                        {character.role?.length > 0 ? (
                                            character.role?.map(
                                                (role, index) => {
                                                    return (
                                                        <Badge
                                                            key={index}
                                                            color="gray"
                                                        >
                                                            {role}
                                                        </Badge>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <p>---</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <h6 className="text-neutral-400">STATUS</h6>
                                    {character.status ? (
                                        <Badge color="gray">
                                            {character.status}
                                        </Badge>
                                    ) : (
                                        <p>---</p>
                                    )}
                                </div>

                                <div>
                                    <h6 className="text-neutral-400">GOAL</h6>
                                    {character.goal ? (
                                        <p>{character.goal}</p>
                                    ) : (
                                        <p>---</p>
                                    )}
                                </div>
                            </section>
                        </section>
                        <section className="w-full flex flex-col gap-5">
                            {/* <div className="rounded-lg h-full w-full bg-neutral-300"></div> */}
                            {character.image ? (
                                <img
                                    src={`http://localhost:4000/${character.image}`} // ✅ works in dev with Vite proxy
                                    alt={`${character.name}'s portrait`}
                                    className="rounded-lg object-cover w-full h-full max-h-[500px]"
                                />
                            ) : (
                                <div className="rounded-lg h-full w-full bg-neutral-300 flex justify-center items-center">
                                    <i class="fa-solid fa-image text-3xl text-neutral-400"></i>
                                </div>
                            )}
                        </section>
                    </div>

                    <div className="grid grid-cols-[1fr,1fr]">
                        <section className="p-5 flex flex-col gap-3">
                            <h6 className="text-neutral-400">
                                PHYSICAL ATTRIBUTES & EXPRESSION
                            </h6>

                            <div className="card w-full grid grid-cols-2 gap-3">
                                <p className="font-bold">Eye Color</p>
                                {character.physicalDescription?.eyeColor ? (
                                    <div
                                        className="w-full h-5 rounded-lg"
                                        style={{
                                            backgroundColor:
                                                character.physicalDescription
                                                    ?.eyeColor,
                                        }}
                                    ></div>
                                ) : (
                                    <p className="text-right">---</p>
                                )}

                                <p className="font-bold">Hair Color</p>
                                {character.physicalDescription?.hairColor ? (
                                    <div
                                        className="w-full h-5 rounded-lg"
                                        style={{
                                            backgroundColor:
                                                character.physicalDescription
                                                    ?.hairColor,
                                        }}
                                    ></div>
                                ) : (
                                    <p className="text-right">---</p>
                                )}

                                <p className="font-bold">Height</p>
                                {character.physicalDescription?.height ? (
                                    <p className="text-center">
                                        {character.physicalDescription?.height}
                                    </p>
                                ) : (
                                    <p className="text-right">---</p>
                                )}

                                <p className="font-bold">Gender</p>
                                {character.physicalDescription?.gender ? (
                                    <p className="text-center">
                                        {character.physicalDescription?.gender}
                                    </p>
                                ) : (
                                    <p className="text-right">---</p>
                                )}
                            </div>
                        </section>
                        <div className="flex flex-col gap-3 p-5">
                            <section className="flex flex-col gap-3">
                                <h6 className="text-neutral-400">
                                    PERSONALITY
                                </h6>

                                <div className="card flex flex-wrap gap-1">
                                    {character.personality?.length > 0 ? (
                                        character.personality?.map(
                                            (alias, index) => {
                                                return (
                                                    <Badge
                                                        key={index}
                                                        color="gray"
                                                    >
                                                        {alias}
                                                    </Badge>
                                                );
                                            }
                                        )
                                    ) : (
                                        <p>---</p>
                                    )}
                                </div>
                            </section>

                            <section className="flex flex-col gap-3">
                                <h6 className="text-neutral-400">
                                    HABITS & MANNERISMS
                                </h6>
                                <div className="card flex flex-wrap gap-1">
                                    {character.habitsMannerisms ? (
                                        <p>{character.habitsMannerisms}</p>
                                    ) : (
                                        <p>---</p>
                                    )}
                                </div>
                            </section>
                        </div>
                    </div>

                    <section className="p-5">
                        <h2 className="text-neutral-400">BIOGRAPHY</h2>
                        {character.biography?.length > 0 ? (
                            <BiographyTimeline
                                biography={character.biography}
                            />
                        ) : (
                            <p>---</p>
                        )}
                    </section>

                    <section className="p-5 flex flex-col gap-3">
                        <h2 className=" text-neutral-400">RELATIONSHIPS</h2>
                        {character.biography?.length > 0 ? (
                            character.relationships?.map(
                                (relationship, index) => {
                                    return (
                                        <RelationshipItem
                                            key={index}
                                            relationship={relationship}
                                            editable={false}
                                        />
                                    );
                                }
                            )
                        ) : (
                            <p>---</p>
                        )}
                    </section>
                </>
            )}

            <Modal
                opened={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                title="Confirm Deletion"
                centered
            >
                <p>Are you sure you want to delete this character?</p>

                <div className="flex justify-end gap-3 mt-5">
                    <Button
                        variant="outline"
                        color="gray"
                        onClick={() => setDeleteModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button color="gray" onClick={handleDeleteCharacter}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default CharacterDetail;
