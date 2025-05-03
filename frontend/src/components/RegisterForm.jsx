import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "./Alert";
import { registerUser } from "../controllers/usersController";
import { UserContext } from "../contexts/UserContext";

import { TextInput, PasswordInput, Button } from "@mantine/core";

const Register = () => {
    const { user, setUser } = useContext(UserContext);

    // use navigate hoook
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    // form data state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            //register user
            await registerUser(
                formData.email,
                formData.password,
                formData.passwordConfirm
            );
            // update user state
            setUser({ email: formData.email });

            //navigate to home/projects page
            navigate("/");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="flex flex-col gap-3">
            <h1 className="font-bold text-2xl">Create a new account.</h1>
            <form onSubmit={handleRegister} className="flex flex-col gap-3">
                <TextInput
                    label="Email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    autoFocus
                />
                <PasswordInput
                    label="Password"
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                <PasswordInput
                    label="Confirm Password"
                    placeholder="********"
                    value={formData.passwordConfirm}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            passwordConfirm: e.target.value,
                        })
                    }
                />
                <div>
                    <Button color="gray" className="w-full" type="submit">
                        Register
                    </Button>
                    {error ? (
                        <Alert msg={error} />
                    ) : (
                        <div className="h-[28px]"></div>
                    )}
                </div>
            </form>
        </section>
    );
};

export default Register;
