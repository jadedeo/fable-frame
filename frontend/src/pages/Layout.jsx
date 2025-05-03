import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
import AuthPage from "./AuthPage";
import Home from "./Home";
import SideNav from "../components/SideNav";

const Layout = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    console.log(user);

    //bg-[url(gradientBg.jpg)] bg-no-repeat bg-cover
    return (
        <div className="p-10 h-screen w-screen max-w-screen-xl mx-auto">
            {/* IF USER LOGGED IN */}
            {user.email ? (
                <div className="flex gap-8 h-full">
                    <header className="card p-0 w-[130px] h-full">
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
