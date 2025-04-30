import CharacterForm from "../components/CharacterForm";
import Heading from "../components/Heading";

const CreateCharacter = () => {
    return (
        <div className="h-full">
            <Heading
                title={"Create New Character Profile"}
                subtitle={"[subtitle here]"}
            />
            <CharacterForm />
        </div>
    );
};

export default CreateCharacter;
