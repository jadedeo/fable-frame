import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import CharacterDetail from "./pages/CharacterDetail";

import AuthRoutes from "./routes/AuthRoutes";
import GuestRoutes from "./routes/GuestRoutes";
import CreateCharacter from "./pages/CreateCharacter";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />

                    {/* <Route element={<AuthRoutes />}> */}

                    <Route
                        path="/projects/:projectId"
                        element={<ProjectDetail />}
                    />
                    <Route
                        path="/projects/:projectId/characters/:characterId"
                        element={<CharacterDetail />}
                    />
                    <Route
                        path="/projects/:projectId/createCharacter"
                        element={<CreateCharacter />}
                    />
                    {/* </Route> */}

                    {/* <Route element={<GuestRoutes />}> */}
                    {/* <Route path="login" element={<LoginForm />} /> */}
                    {/* <Route path="register" element={<RegisterForm />} /> */}
                    {/* </Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App;
