/** Get project characters */
const getProjectCharacters = async (projectId) => {
    // console.log(localStorage.getItem("token"));

    const res = await fetch(`/api/projects/${projectId}/characters`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

const getCharacter = async (projectId, characterId) => {
    const res = await fetch(
        `/api/projects/${projectId}/characters/${characterId}`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

/** Create character */
// const createCharacter = async (projectId, characterData) => {
//     if (!characterData.name) {
//         throw Error("Character name is required");
//     }

//     const res = await fetch(`/api/projects/${projectId}/characters`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({
//             characterData,
//         }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//         throw Error(data.error);
//     }
//     return data;
// };
const createCharacter = async (projectId, formData) => {
    const res = await fetch(`/api/projects/${projectId}/characters`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw Error(data.error);
    return data;
};

/** Update character */
// const updateCharacter = async (projectId, characterData) => {
//     // console.log("HERE", characterData);
//     if (!characterData.name) {
//         throw Error("Character name is required");
//     }

//     const res = await fetch(
//         `/api/projects/${projectId}/characters/${characterData._id}`,
//         {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: JSON.stringify({ characterData }),
//         }
//     );

//     const data = await res.json();

//     if (!res.ok) {
//         throw Error(data.error);
//     }
//     return data;
// };
const updateCharacter = async (projectId, characterId, formData) => {
    const res = await fetch(
        `/api/projects/${projectId}/characters/${characterId}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        }
    );

    const data = await res.json();
    if (!res.ok) throw Error(data.error);
    return data;
};

/** Delete character */
const deleteCharacter = async (projectId, characterId) => {
    const res = await fetch(
        `/api/projects/${projectId}/characters/${characterId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw Error(data.error);
    }
    return data;
};

export {
    getProjectCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    deleteCharacter,
};
