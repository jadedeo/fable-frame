import { createContext, useState } from "react";

export const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
    const [project, setProject] = useState({
        characters: [],
    });

    return (
        <ProjectContext.Provider value={{ project, setProject }}>
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectProvider;
