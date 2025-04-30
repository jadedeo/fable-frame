import Heading from "../components/Heading";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    getCharacter,
    deleteCharacter,
} from "../controllers/charactersController";
import CharacterForm from "../components/CharacterForm";
import { Modal, Button } from "@mantine/core";

const CharacterDetail = () => {
    const navigate = useNavigate();

    const { projectId } = useParams();
    const { characterId } = useParams();
    const [character, setCharacter] = useState([]);
    //loading state
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(null);
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

    return (
        <div className="h-full">
            <Heading title={character.name} />

            <div className="mt-10 flex flex-col gap-10">
                {loading && (
                    <div className="w-full flex items-center justify-center">
                        <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
                    </div>
                )}

                {!isEditing && (
                    <div className="flex gap-3">
                        <i
                            className="fa-solid fa-pencil cursor-pointer"
                            onClick={() => setIsEditing(true)}
                        ></i>
                        <i
                            className="fa-solid fa-trash-can"
                            onClick={() => setDeleteModalOpen(true)}
                        ></i>
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
                        onClick={() => setDeleteModalOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteCharacter}>Delete</Button>
                </div>
            </Modal>
        </div>
    );
};

export default CharacterDetail;
