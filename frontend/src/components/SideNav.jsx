import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import logo from "../assets/fableframelogo.png"; // Adjust path as needed

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
        <section className="px-2 py-0 h-full flex flex-col justify-between bg-white">
            <div className="flex flex-col gap-5">
                <div
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    {/* <div className="w-full h-20 bg-neutral-500"></div> */}
                    <img src={logo} className="absolute top-[25px] h-[150px]" />
                </div>

                <div className="mt-[125px] px-2 text-center">
                    <hr></hr>
                    <small>more side bar content here</small>
                </div>
            </div>
            <div className="mb-4 px-2 text-center">
                <button onClick={handleLogout} className="cursor-pointer">
                    <small>LOGOUT</small>
                </button>
            </div>
        </section>
    );
};

export default SideNav;
