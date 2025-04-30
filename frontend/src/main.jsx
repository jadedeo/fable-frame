import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/app.css";
import App from "./App.jsx";
import UserProvider from "./contexts/UserContext.jsx";
import PostProvider from "./contexts/PostContext.jsx";
import ProjectProvider from "./contexts/ProjectContext.jsx";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
    /** Put your mantine theme override here */
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <PostProvider>
                <UserProvider>
                    <ProjectProvider>
                        <App />
                    </ProjectProvider>
                </UserProvider>
            </PostProvider>
        </MantineProvider>
    </StrictMode>
);
