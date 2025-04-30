import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/users/Login";
import Register from "./pages/users/Register";
import Dashboard from "./pages/users/Dashboard";
import Home from "./pages/posts/Home";
import ProjectDetail from "./pages/ProjectDetail";
import CharacterDetail from "./pages/CharacterDetail";
import Create from "./pages/posts/Create";
import Update from "./pages/posts/Update";

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
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="create" element={<Create />} />
                    <Route path="update" element={<Update />} />

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
                    {/* <Route path="login" element={<Login />} /> */}
                    {/* <Route path="register" element={<Register />} /> */}
                    {/* </Route> */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default App;
