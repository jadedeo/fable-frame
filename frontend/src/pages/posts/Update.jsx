import { useContext, useState } from "react";
import { updatePost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { PostContext } from "../../contexts/PostContext";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    //use post context
    const { posts, setPosts } = useContext(PostContext);

    //use navigate hook
    const navigate = useNavigate();
    const { state } = useLocation();
    // console.log(state);

    //error state
    const [error, setError] = useState(null);
    //form data state
    const [formData, setFormData] = useState({
        title: state.title,
        body: state.body,
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        // console.log(formData.title, formData.body);

        try {
            //create new post
            const data = await updatePost(
                state._id,
                formData.title,
                formData.body
            );
            console.log(data);

            //update post state
            setPosts([...posts, data.post]);

            //navigate to dashboard
            navigate("/dashboard");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section className="card">
            <h1 className="title">Update post</h1>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="Post Title"
                    className="input"
                    autoFocus
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                ></input>
                {/* {formData.title} */}
                <textarea
                    placeholder="Post content"
                    className="input"
                    rows="6"
                    value={formData.body}
                    onChange={(e) =>
                        setFormData({ ...formData, body: e.target.value })
                    }
                ></textarea>
                {/* {formData.body} */}

                <button className="btn">Update</button>
            </form>

            {error && <Alert msg={error}></Alert>}
        </section>
    );
};

export default Update;
