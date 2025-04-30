import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { deletePost, getUserPosts } from "../../controllers/postsController";
import { UserContext } from "../../contexts/UserContext";

import Post from "../../components/Post";
import Alert from "../../components/Alert";
import Success from "../../components/Success";

const Dashboard = () => {
    // use user context
    const { user, setUser } = useContext(UserContext);

    //loading state
    const [loading, setLoading] = useState(true);

    //error state
    const [error, setError] = useState(null);
    //success state
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        setTimeout(async () => {
            //get user posts
            const { email, userPosts } = await getUserPosts();

            //update user state
            setUser({ email, posts: userPosts });

            console.log(email);
            console.log(userPosts);
            setLoading(false);
        }, 500);
    }, []);

    // handle delete post
    const handleDelete = async (_id) => {
        console.log("delete:", _id);

        if (confirm("Confirm delete?")) {
            try {
                const data = await deletePost(_id);
                setSuccess(data.success);
            } catch (error) {
                console.log(error.message);
                setError(error.message);
            }

            // if don't filter out deleted post here, would have to wait for page refresh to see update
            const newPosts = user.posts.filter((post) => post._id !== _id);
            setUser({ ...user, posts: newPosts });
        }
    };

    return (
        <section className="card">
            <p>{user.email}</p>
            <h1 className="title">User Dashboard</h1>
            {loading && (
                <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
            )}
            {success && <Success msg={success} />}
            {error && <Alert msg={error} />}

            {user.posts &&
                user.posts.map((post) => (
                    <div key={post._id}>
                        <Post post={post}>
                            <div className="flex items-center gap-2">
                                <Link
                                    className="fa-solid fa-pen-to-square nav-link text-green-500 hover:bg-green-200"
                                    title="Update"
                                    state={post}
                                    to="/update"
                                ></Link>
                                <button
                                    className="fa-solid fa-trash-can nav-link text-red-500 hover:bg-red-200"
                                    title="Delete"
                                    onClick={() => handleDelete(post._id)}
                                ></button>
                            </div>
                        </Post>
                    </div>
                ))}
        </section>
    );
};

export default Dashboard;
