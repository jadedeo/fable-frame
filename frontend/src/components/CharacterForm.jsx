import { useState, useEffect } from "react";
import MultiSelectCreatable from "./MultiSelectCreatable";
import {
    TextInput,
    Textarea,
    NumberInput,
    MultiSelect,
    Select,
    ColorInput,
    Modal,
    Button,
} from "@mantine/core";
import RelationshipForm from "./RelationshipForm";
import RelationshipItem from "./RelationshipItem";
import BiographyItem from "./BiographyItem";
import BiographyForm from "./BiographyForm";
import {
    createCharacter,
    updateCharacter,
} from "../controllers/charactersController";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";

const CharacterForm = ({ character, isEditing, onDoneEditing }) => {
    useEffect(() => {
        // console.log(character);
        if (character) {
            setCharacterData(character);
        }
    }, [character]);
    // use navigate hoook
    const navigate = useNavigate();
    //error state
    const [error, setError] = useState(null);
    //form data state
    const [characterData, setCharacterData] = useState({
        name: "", // ✓
        description: "", // ✓
        aliases: [], // ✓
        status: "", // ✓
        role: [], // ✓
        goal: "", // ✓
        physicalDescription: {
            age: null,
            gender: "",
            eyeColor: "",
            hairColor: "",
            height: "",
        }, // ✓
        personality: [], // ✓
        habitsMannerisms: "", // ✓
        skills: [], // ✓
        biography: [], // ✓
        relationships: [], // ✓
    });
    const { projectId } = useParams();

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(null);

    const [editingItem, setEditingItem] = useState(null);

    const [imageFile, setImageFile] = useState(null);
    const [removeImage, setRemoveImage] = useState(false);

    const handleDelete = (type, idToDelete) => {
        if (type == "biography") {
            setCharacterData({
                ...characterData,
                biography: characterData.biography.filter(
                    (event) => event.id !== idToDelete
                ),
            });
        } else {
            setCharacterData({
                ...characterData,
                relationships: characterData.relationships.filter(
                    (event) => event.id !== idToDelete
                ),
            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("characterData", JSON.stringify(characterData)); // character object as string
        if (imageFile) {
            formData.append("image", imageFile); // append image
        }
        if (removeImage) {
            formData.append("removeImage", "true");
        }

        try {
            if (isEditing) {
                // console.log("SAVE EDIT");
                const data = await updateCharacter(
                    projectId,
                    character._id,
                    formData
                ); // pass FormData
                // console.log("character updated", data);
                if (onDoneEditing) onDoneEditing();
            } else {
                // console.log("NEW");
                const data = await createCharacter(projectId, formData); // pass FormData
                // console.log("character created", data.character._id);
                navigate(
                    `/projects/${projectId}/characters/${data.character._id}`
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // console.log(characterData, projectId);
    //     if (isEditing) {
    //         console.log("SAVE EDIT");
    //         try {
    //             const data = await updateCharacter(
    //                 projectId,
    //                 // characterData._id,
    //                 characterData
    //             );
    //             console.log("character updated", data);
    //             console.log(
    //                 `/projects/${projectId}/characters/${data.character._id}`
    //             );
    //             if (onDoneEditing) onDoneEditing();
    //             // navigate(`/projects/${projectId}/characters/${data.character._id}`, {
    //             //     replace: true,
    //             // });
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     } else {
    //         console.log("NEW");
    //         try {
    //             const data = await createCharacter(projectId, characterData);
    //             console.log("character created", data.character._id);

    //             navigate(
    //                 `/projects/${projectId}/characters/${data.character._id}`
    //             );
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    // };

    return (
        <>
            {isEditing && (
                <Header
                    title={
                        isEditing
                            ? `Editing ${character.name}'s Character Profile`
                            : ""
                    }
                />
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 my-10">
                <Modal
                    opened={open}
                    onClose={() => setOpen(false)}
                    centered
                    size="lg"
                    overlayProps={{
                        backgroundOpacity: 0.55,
                        blur: 3,
                    }}
                    title={
                        modalType === "relationship"
                            ? "Add Relationship"
                            : "Add Key Biography Event"
                    }
                >
                    {modalType === "relationship" && (
                        <RelationshipForm
                            characterData={characterData}
                            setCharacterData={setCharacterData}
                            closeModal={() => {
                                setOpen(false);
                                setEditingItem(null);
                            }}
                            initialData={editingItem}
                        />
                    )}
                    {modalType === "biography" && (
                        <BiographyForm
                            characterData={characterData}
                            setCharacterData={setCharacterData}
                            closeModal={() => {
                                setOpen(false);
                                setEditingItem(null);
                            }}
                            initialData={editingItem}
                        />
                    )}
                </Modal>

                <section className="card w-full flex flex-col gap-5">
                    <div className="grid grid-cols-[1fr,1fr] gap-10 items-end">
                        <TextInput
                            label="Name"
                            placeholder="Insert character name"
                            value={characterData.name}
                            onChange={(e) =>
                                setCharacterData({
                                    ...characterData,
                                    name: e.currentTarget.value,
                                })
                            }
                            required
                            className="w-full"
                        />

                        {/* If a new image is selected, show its name and a remove option */}

                        {imageFile ? (
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                                <span>Selected image: {imageFile.name}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setImageFile(null);
                                        setRemoveImage(false); // reset remove flag when removing new file
                                    }}
                                    className="text-red-500 underline"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : character?.image && !removeImage ? (
                            // Show current image name + option to remove if it exists and not flagged for removal
                            <div className="flex items-center gap-2 text-sm text-neutral-600">
                                <span>
                                    Current image:{" "}
                                    {character.image.split("/").pop()}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setRemoveImage(true)}
                                    className="text-red-500 underline"
                                >
                                    Remove image
                                </button>
                            </div>
                        ) : (
                            // Otherwise, show file input
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setImageFile(e.target.files[0])
                                }
                            />
                        )}
                    </div>

                    <MultiSelectCreatable
                        value={characterData.aliases}
                        onChange={(newAliases) =>
                            setCharacterData({
                                ...characterData,
                                aliases: newAliases,
                            })
                        }
                        placeholder="Add alternate names & titles"
                        label="Aliases"
                    />

                    <div className="flex gap-5">
                        <MultiSelect
                            label="Role"
                            data={[
                                "Primary",
                                "Secondary",
                                "Tertiary",
                                "Protagonist",
                                "Antagonist",
                                "Deutertagonist",
                                "Antihero",
                                "Tragic Hero",
                            ]}
                            value={characterData.role}
                            onChange={(newRole) =>
                                setCharacterData({
                                    ...characterData,
                                    role: newRole,
                                })
                            }
                            clearable
                            checkIconPosition="right"
                            className="w-full"
                        />

                        <Select
                            label="Status"
                            data={["Alive", "Deceased"]}
                            value={characterData.status}
                            onChange={(newStatus) =>
                                setCharacterData({
                                    ...characterData,
                                    status: newStatus,
                                })
                            }
                            className="w-full"
                        />
                    </div>

                    <Textarea
                        label="Goal"
                        placeholder="Summarize character motivations"
                        value={characterData.goal}
                        onChange={(e) =>
                            setCharacterData({
                                ...characterData,
                                goal: e.currentTarget.value,
                            })
                        }
                    />

                    <Textarea
                        label="Description"
                        placeholder="Input brief character description"
                        value={characterData.description}
                        onChange={(e) =>
                            setCharacterData({
                                ...characterData,
                                description: e.currentTarget.value,
                            })
                        }
                        autosize
                        minRows={"5"}
                    />
                </section>

                <section className="card w-full flex flex-col gap-5">
                    <NumberInput
                        label="Age"
                        placeholder="Input character age"
                        min={0}
                        value={characterData.physicalDescription.age}
                        onChange={(newAge) => {
                            setCharacterData({
                                ...characterData,
                                physicalDescription: {
                                    ...characterData.physicalDescription,
                                    age: newAge,
                                },
                            });
                        }}
                    />

                    <Select
                        label="Gender"
                        data={[
                            "Man",
                            "Woman",
                            "Nonbinary",
                            "Transgender",
                            "Genderfluid",
                            "Agender",
                            "Unlisted",
                        ]}
                        value={characterData.physicalDescription.gender}
                        onChange={(newGender) =>
                            setCharacterData({
                                ...characterData,
                                physicalDescription: {
                                    ...characterData.physicalDescription,
                                    gender: newGender,
                                },
                            })
                        }
                        placeholder="Select gender"
                        clearable
                    />

                    <div className="flex gap-5">
                        <ColorInput
                            label="Eye Color"
                            placeholder="Select color"
                            value={characterData.physicalDescription?.eyeColor}
                            onChange={(newEyeColor) =>
                                setCharacterData({
                                    ...characterData,
                                    physicalDescription: {
                                        ...characterData.physicalDescription,
                                        eyeColor: newEyeColor,
                                    },
                                })
                            }
                            className="w-full"
                        />

                        <ColorInput
                            label="Hair Color"
                            placeholder="Select color"
                            value={characterData.physicalDescription?.hairColor}
                            onChange={(newHairColor) =>
                                setCharacterData({
                                    ...characterData,
                                    physicalDescription: {
                                        ...characterData.physicalDescription,
                                        hairColor: newHairColor,
                                    },
                                })
                            }
                            className="w-full"
                        />
                    </div>
                    <TextInput
                        label="Height"
                        value={characterData.physicalDescription?.height}
                        onChange={(e) =>
                            setCharacterData({
                                ...characterData,
                                physicalDescription: {
                                    ...characterData.physicalDescription,
                                    height: e.currentTarget.value,
                                },
                            })
                        }
                        placeholder="e.g. 5'9"
                    />
                </section>

                <section className="card w-full flex flex-col gap-5">
                    <MultiSelectCreatable
                        defaultVals={[
                            "kind",
                            "funny",
                            "stubborn",
                            "charismatic",
                        ]}
                        value={characterData.personality}
                        onChange={(newPersonality) =>
                            setCharacterData({
                                ...characterData,
                                personality: newPersonality,
                            })
                        }
                        placeholder="Pick or add traits"
                        label="Personality"
                    />

                    <Textarea
                        label="Habits & Mannerisms"
                        placeholder="Input description"
                        value={characterData.habitsMannerisms}
                        onChange={(e) =>
                            setCharacterData({
                                ...characterData,
                                habitsMannerisms: e.currentTarget.value,
                            })
                        }
                    />

                    <MultiSelectCreatable
                        value={characterData.skills}
                        onChange={(newSkills) =>
                            setCharacterData({
                                ...characterData,
                                skills: newSkills,
                            })
                        }
                        placeholder="Add abilities & powers"
                        label="Skills"
                    />
                </section>
                <section className="card w-full flex flex-col gap-5">
                    <div className="flex justify-between">
                        <label
                            style={{
                                fontSize: "var(--mantine-font-size-sm)",
                                fontWeight: "500",
                            }}
                        >
                            Relationships
                        </label>
                        <i
                            className="fa-solid fa-plus cursor-pointer"
                            onClick={() => {
                                setModalType("relationship");
                                setOpen(true);
                            }}
                        ></i>
                    </div>
                    {characterData.relationships?.length > 0 &&
                        characterData.relationships.map(
                            (relationship, index) => {
                                return (
                                    <RelationshipItem
                                        key={index}
                                        relationship={relationship}
                                        onEdit={() => {
                                            setEditingItem(relationship);
                                            setModalType("relationship");
                                            setOpen(true);
                                        }}
                                        onDelete={() =>
                                            handleDelete(
                                                "relationship",
                                                relationship.id
                                            )
                                        }
                                    />
                                );
                            }
                        )}
                </section>

                <section className="card w-full flex flex-col gap-5">
                    <div className="flex justify-between">
                        <label
                            style={{
                                fontSize: "var(--mantine-font-size-sm)",
                                fontWeight: "500",
                            }}
                        >
                            Biography
                        </label>
                        <i
                            className="fa-solid fa-plus cursor-pointer"
                            onClick={() => {
                                setModalType("biography");
                                setOpen(true);
                            }}
                        ></i>
                    </div>
                    {characterData.biography?.length > 0 && (
                        <div>
                            {characterData.biography.map((event, index) => {
                                return (
                                    <BiographyItem
                                        key={event.id}
                                        event={event}
                                        onEdit={() => {
                                            setEditingItem(event);
                                            setModalType("biography");
                                            setOpen(true);
                                        }}
                                        onDelete={() =>
                                            handleDelete("biography", event.id)
                                        }
                                    />
                                );
                            })}
                        </div>
                    )}
                </section>

                <div className="flex gap-5 justify-end">
                    <Button color="gray" type="submit">
                        {isEditing ? "Save Changes" : "Create"}
                    </Button>
                    <Button
                        color="gray"
                        variant="outline"
                        onClick={() => onDoneEditing()}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CharacterForm;
