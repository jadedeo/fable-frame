import { useContext, useState } from "react";
import { createPost } from "../../controllers/postsController";
import Alert from "../../components/Alert";
import { PostContext } from "../../contexts/PostContext";
import { useNavigate } from "react-router-dom";

const Create = () => {
    //use post context
    const { posts, setPosts } = useContext(PostContext);

    //use navigate hook
    const navigate = useNavigate();

    //error state
    const [error, setError] = useState(null);
    //form data state
    const [formData, setFormData] = useState({
        title: "",
        body: "",
    });

    const handleCreate = async (e) => {
        e.preventDefault();
        // console.log(formData.title, formData.body);
        try {
            //create new post
            const data = await createPost(formData.title, formData.body);
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
            <h1 className="title">Create a new post</h1>
            <form onSubmit={handleCreate}>
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

                <button className="btn">Create</button>
            </form>

            {error && <Alert msg={error}></Alert>}
        </section>
    );
};

export default Create;
