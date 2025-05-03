import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";
import { TextInput, PasswordInput, Button } from "@mantine/core";

const Login = () => {
    // use user context
    const { setUser } = useContext(UserContext);

    // use navigate hoook
    const navigate = useNavigate();

    const [error, setError] = useState(null);

    // form data state
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            //login user
            await loginUser(formData.email, formData.password);
            // update user state
            setUser({ email: formData.email, posts: [] });

            //navigate to dashboard
            navigate("/dashboard");
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };

    return (
        <section className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl">Log into your account.</h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
                <TextInput
                    label="Email"
                    placeholder="example@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    autoFocus
                />
                {formData.email}
                <PasswordInput
                    label="Password"
                    placeholder="********"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                {formData.password}
                <div>
                    <Button
                        color="gray"
                        className="w-full"
                        onClick={handleLogin}
                    >
                        Login
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

export default Login;
