import { useEffect, useState } from "react";
import Login from "./users/Login";
import Register from "./users/Register";
import { Button } from "@mantine/core";

import logo from "../assets/fableframelogo.png";

const AuthPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showSignupForm, setShowSignupForm] = useState(false);
    return (
        <section className="flex justify-center h-full">
            <div className="card flex gap-10 max-w-[75%] mx-auto my-auto w-[700px] py-[50px] px-[30px]">
                <div className="flex gap-3 items-center justify-center ">
                    <div className="w-[250px] h-[300px] ">
                        <img src={logo} alt="FableFrame logo" className="" />
                    </div>
                    {/* <h1>fableframe</h1> */}
                </div>
                {showLoginForm ? (
                    <div className="flex flex-col gap-5 justify-center w-full">
                        <Login />
                        <small className="block w-full text-center">
                            Don't have an account yet?{" "}
                            <a
                                onClick={() => {
                                    setShowLoginForm(false);
                                    setShowSignupForm(true);
                                }}
                                color="gray"
                                className="underline cursor-pointer"
                            >
                                Sign up now.
                            </a>
                        </small>
                    </div>
                ) : (
                    ""
                )}

                {showSignupForm ? (
                    <div className="flex flex-col gap-5 justify-center w-full">
                        <Register />
                        <small className="block w-full text-center">
                            Already have an account?{" "}
                            <a
                                onClick={() => {
                                    setShowSignupForm(false);
                                    setShowLoginForm(true);
                                }}
                                color="gray"
                                className="underline cursor-pointer"
                            >
                                Log in now.
                            </a>
                        </small>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
};

export default AuthPage;
