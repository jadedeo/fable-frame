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

    return (
        <div>
            {/* IF USER LOGGED IN */}
            {user.email ? (
                <div className="flex h-screen w-screen">
                    <header className="bg-white w-[20%] min-w-[200px] h-screen">
                        <SideNav />
                        {/* <div className="h-full max-w-10% bg-amber-200">
                    <Link
                        title="Home"
                        to="/"
                        className="fa-solid fa-house nav-link"
                    ></Link>

                    {user.email ? (
                        <Home />
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                title="Create Post"
                                to="/create"
                                className="fa-solid fa-circle-plus nav-link"
                            ></Link>

                            <Link
                                title="Dashboard"
                                to="/dashboard"
                                className="fa-solid fa-circle-user nav-link"
                            ></Link>
                            <button
                                title="Log Out"
                                onClick={handleLogout}
                                className=" nav-link"
                            >
                                logout
                            </button>
                        </div>
                        <AuthPage />
                        <div className="flex items-center gap-2">
                            <Link
                                title="Login"
                                to="/login"
                                className="nav-link"
                            >
                                login
                            </Link>
                            <Link
                                title="Register"
                                to="/register"
                                className="fa-solid fa-user-plus nav-link"
                            ></Link>
                        </div>
                    )}
                </div> */}
                    </header>

                    <main className="w-full bg-gray-100 overflow-scroll">
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
