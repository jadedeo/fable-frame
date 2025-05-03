import { useNavigate, useParams } from "react-router-dom";
import CharacterForm from "../components/CharacterForm";
import Header from "../components/Header";

const CreateCharacter = () => {
    const navigate = useNavigate();

    const { projectId } = useParams();

    const onDoneEditing = () => {
        navigate(`/projects/${projectId}`);
    };
    return (
        <div className="h-full overflow-scroll">
            <Header title={"Create New Character Profile"} />
            <CharacterForm onDoneEditing={onDoneEditing} />
        </div>
    );
};

export default CreateCharacter;
