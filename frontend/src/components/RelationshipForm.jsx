import { useState, useEffect } from "react";
import MultiSelectCreatable from "./MultiSelectCreatable";
import { TextInput, Textarea, Button } from "@mantine/core";
import { nanoid } from "nanoid";

const RelationshipForm = ({
    characterData,
    setCharacterData,
    closeModal,
    initialData,
}) => {
    useEffect(() => {
        if (initialData) {
            setRelationshipData(initialData);
        }
    }, [initialData]);

    const [relationshipData, setRelationshipData] = useState({
        name: "",
        type: [],
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(relationshipData);

        let updatedRelationship;

        if (initialData) {
            updatedRelationship = characterData.relationships.map(
                (relationship) =>
                    relationship.id === initialData.id
                        ? { ...relationshipData, id: initialData.id }
                        : relationship
            );
        } else {
            // Create mode: add new item with ID
            const newRelationship = { ...relationshipData, id: nanoid() };
            updatedRelationship = [
                ...characterData.relationships,
                newRelationship,
            ];
        }

        setCharacterData({
            ...characterData,
            relationships: updatedRelationship,
        });
        closeModal();
        setRelationshipData({ name: "", type: [], description: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 ">
            <TextInput
                label="Relation Name"
                placeholder="Insert name of relation"
                value={relationshipData.name}
                onChange={(e) =>
                    setRelationshipData({
                        ...relationshipData,
                        name: e.currentTarget.value,
                    })
                }
            />

            <MultiSelectCreatable
                defaultVals={[
                    "Friend",
                    "Acquaintance",
                    "Rival",
                    "Partner",
                    "Spouse",
                    "Significant Other",
                    "It's Complicated",
                ]}
                value={relationshipData.type}
                onChange={(newType) =>
                    setRelationshipData({
                        ...relationshipData,
                        type: newType,
                    })
                }
                placeholder="Pick or add relationship type"
                label="Relationship Type"
            />

            <Textarea
                label="Description"
                placeholder="Input description"
                value={relationshipData.description}
                onChange={(e) =>
                    setRelationshipData({
                        ...relationshipData,
                        description: e.currentTarget.value,
                    })
                }
                minRows={5}
                autosize
            />

            <div className="flex justify-end gap-2">
                <Button onClick={handleSubmit}>Save</Button>
                <Button variant="outline" onClick={() => closeModal()}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default RelationshipForm;
