import { useState, useEffect } from "react";
import MultiSelectCreatable from "./MultiSelectCreatable";
import { TextInput, Textarea, Button } from "@mantine/core";
import { nanoid } from "nanoid";

const BiographyForm = ({
    characterData,
    setCharacterData,
    closeModal,
    initialData,
}) => {
    useEffect(() => {
        if (initialData) {
            setBioEventData(initialData);
        }
    }, [initialData]);

    const [bioEventData, setBioEventData] = useState({
        title: "",
        tags: [],
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let updatedBiography;

        if (initialData) {
            // Edit mode: replace matching item by id
            updatedBiography = characterData.biography.map((event) =>
                event.id === initialData.id
                    ? { ...bioEventData, id: initialData.id }
                    : event
            );
        } else {
            // Create mode: add new item with ID
            const newEvent = { ...bioEventData, id: nanoid() };
            updatedBiography = [...characterData.biography, newEvent];
        }

        setCharacterData({
            ...characterData,
            biography: updatedBiography,
        });
        closeModal();
        setBioEventData({ title: "", tags: [], description: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <TextInput
                label="Title"
                placeholder="Insert title"
                value={bioEventData.title}
                onChange={(e) =>
                    setBioEventData({
                        ...bioEventData,
                        title: e.currentTarget.value,
                    })
                }
            />

            <MultiSelectCreatable
                defaultVals={[
                    "Formative",
                    "High Key Traumatic",
                    "Will Never Talk About It",
                ]}
                value={bioEventData.tags}
                onChange={(newTags) =>
                    setBioEventData({
                        ...bioEventData,
                        tags: newTags,
                    })
                }
                placeholder="Pick or add tags"
                label="Tags"
            />

            <Textarea
                label="Description"
                placeholder="Input description"
                value={bioEventData.description}
                onChange={(e) =>
                    setBioEventData({
                        ...bioEventData,
                        description: e.currentTarget.value,
                    })
                }
                minRows={5}
                autosize
            />

            <div className="flex justify-end gap-2">
                <Button onClick={handleSubmit} color="gray">
                    Save
                </Button>
                <Button
                    variant="outline"
                    color="gray"
                    onClick={() => closeModal()}
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default BiographyForm;
