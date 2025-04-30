import { useContext, useEffect, useState } from "react";
import { getPosts } from "../../controllers/postsController";
import { getProjects } from "../../controllers/projectsController";
import { PostContext } from "../../contexts/PostContext";
import Post from "../../components/Post";
import Project from "../../components/Project";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading";

const Home = () => {
    //use post context
    // const { posts, setPosts } = useContext(PostContext);

    //use project context
    const [projects, setProjects] = useState([]);

    //loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //can't make useEffect itself async so use setTimeout & make it's callback async instead
        setTimeout(async () => {
            //get all posts
            // const data = await getPosts();

            //get all projects
            const data = await getProjects();

            console.log("!!!", data.userProjects);

            //update posts state
            // setPosts(data.posts);

            //update projects state
            setProjects(data.userProjects);

            //remove loading state
            setLoading(false);
        }, 500);
    }, []);

    // console.log(posts);
    return (
        <div className="h-full">
            <Heading
                title={"your projects"}
                subtitle={"you can't edit a blank page"}
            />

            {loading && (
                <div className="w-full flex items-center justify-center">
                    <i className="fa-solid fa-spinner animate-spin text-3xl text-center block"></i>
                </div>
            )}

            {projects && (
                <section className="p-5 flex flex-col gap-5">
                    {projects.map((project) => (
                        <Link key={project._id} to={`/projects/${project._id}`}>
                            <Project project={project} />
                        </Link>
                    ))}
                </section>
            )}
        </div>

        // show projects here

        // <section className="card">
        //     {posts &&
        //         posts.map((post) => <Post key={post._id} post={post}></Post>)}
        // </section>
    );
};

export default Home;
