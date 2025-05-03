import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./assets/app.css";
import "./index.css";
import App from "./App.jsx";
import UserProvider from "./contexts/UserContext.jsx";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
    /** Put your mantine theme override here */
});

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MantineProvider theme={theme}>
            <UserProvider>
                <App />
            </UserProvider>
        </MantineProvider>
    </StrictMode>
);
