import { useEffect, useState } from "react";
import Login from "./users/Login";
import Register from "./users/Register";

const AuthPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showSignupForm, setShowSignupForm] = useState(false);
    return (
        <section>
            <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-teal-500"></div>
                <h1>fableframe</h1>
            </div>

            <div>
                {showLoginForm ? (
                    <>
                        <Login />
                        <button
                            onClick={() => {
                                setShowLoginForm(false);
                                setShowSignupForm(true);
                            }}
                        >
                            SIGN UP NOW
                        </button>
                    </>
                ) : (
                    ""
                )}

                {showSignupForm ? (
                    <>
                        <Register />
                        <button
                            onClick={() => {
                                setShowSignupForm(false);
                                setShowLoginForm(true);
                            }}
                        >
                            LOG IN
                        </button>
                    </>
                ) : (
                    ""
                )}
            </div>
        </section>
    );
};

export default AuthPage;
