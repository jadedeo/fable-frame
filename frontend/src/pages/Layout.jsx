import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import AuthPage from "./AuthPage";
import Home from "./posts/Home";
import SideNav from "../components/SideNav";

const Layout = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    console.log(user);

    // const handleLogout = () => {
    //     if (confirm("Confirm Logout?")) {
    //         console.log("logout");
    //         setUser({ email: null, posts: [] });
    //         localStorage.removeItem("email");
    //         localStorage.removeItem("token");
    //         navigate("/");
    //     }
    // };

    //bg-[url(gradientBg.jpg)] bg-no-repeat bg-cover
    return (
        <div className="p-10 bg-neutral-100 h-screen w-screen ">
            {/* IF USER LOGGED IN */}
            {user.email ? (
                <div className="flex gap-8 h-full">
                    <header className="bg-white w-[150px] h-full">
                        <SideNav />
                    </header>

                    <main className="w-full ">
                        <Outlet />
                    </main>
                </div>
            ) : (
                // IF USER NOT LOGGED IN
                <AuthPage />
            )}
        </div>
    );
};

export default Layout;
