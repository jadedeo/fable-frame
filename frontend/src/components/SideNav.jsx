import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
    const { user, setUser } = useContext(UserContext);

    // use navigate hoook
    const navigate = useNavigate();

    const handleLogout = () => {
        if (confirm("Confirm Logout?")) {
            console.log("logout");
            setUser({ email: null, posts: [] });
            localStorage.removeItem("email");
            localStorage.removeItem("token");
            navigate("/");
        }
    };
    return (
        <section className="px-6 py-8 h-full flex flex-col justify-between">
            <div className="flex flex-col gap-5">
                <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <div className="w-10 h-10 bg-gray-500"></div>
                    <h1>fableframe</h1>
                </div>

                <small>more side bar content here</small>
            </div>
            <div>
                <button onClick={handleLogout} className="cursor-pointer">
                    <small>LOGOUT</small>
                </button>
            </div>
        </section>
    );
};

export default SideNav;
