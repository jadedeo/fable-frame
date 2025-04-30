import { useNavigate, useParams } from "react-router-dom";
import CharacterForm from "../components/CharacterForm";
import Heading from "../components/Heading";

const CreateCharacter = () => {
    const navigate = useNavigate();

    const { projectId } = useParams();

    const onDoneEditing = () => {
        navigate(`/projects/${projectId}`);
    };
    return (
        <div className="h-full">
            <Heading title={"Create New Character Profile"} />
            <CharacterForm onDoneEditing={onDoneEditing} />
        </div>
    );
};

export default CreateCharacter;
