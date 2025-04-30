import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "../../components/Alert";
import { loginUser } from "../../controllers/usersController";
import { UserContext } from "../../contexts/UserContext";

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
        <section className="">
            <h1 className="title">Log into your account.</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email Address"
                    className="input"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    autoFocus
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input"
                    value={formData.password}
                    onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                    }
                />
                <button className="btn">Login</button>
            </form>
            {error && <Alert msg={error} />}
        </section>
    );
};

export default Login;
