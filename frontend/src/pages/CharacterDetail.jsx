import Heading from "../components/Heading";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCharacter } from "../controllers/charactersController";
import CharacterForm from "../components/CharacterForm";

const CharacterDetail = () => {
    const { projectId } = useParams();
    const { characterId } = useParams();
    const [character, setCharacter] = useState([]);
    //loading state
    const [loading, setLoading] = useState(true);

    const [operation, setOperation] = useState(null);

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
    const handleDoneEditing = () => {
        setOperation(null);
        fetchCharacterData();
    };

    useEffect(() => {
        fetchCharacterData();
    }, [characterId]);
    return (
        <div className="h-full">
            <Heading title={character.name} />

            <div className="mt-10 flex flex-col gap-10">
                {loading && (
                    <div className="w-full flex items-center justify-center">
                        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
                    </div>
                )}

                {!operation && (
                    <div className="flex gap-3">
                        <i
                            className="fa-solid fa-pencil cursor-pointer"
                            onClick={() => setOperation("editing")}
                        ></i>
                        <i
                            className="fa-solid fa-trash-can"
                            onClick={() => setOperation("delete")}
                        ></i>
                    </div>
                )}

                {operation == "editing" && (
                    <CharacterForm
                        character={character}
                        operation={operation}
                        onDoneEditing={handleDoneEditing}
                    />
                )}
            </div>
        </div>
    );
};

export default CharacterDetail;
