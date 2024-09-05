

import { useEffect, useState } from "react";
import PostsItem from "./PostsItem";
import Loader from "./Loader";
import axios from 'axios';
export default function Posts() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
                setPosts(response?.data);
            } catch (err) {
                console.log(err);

            }
            setIsLoading(false)
        }
        fetchPosts();
    }, [])
    if (isLoading) {
        return <Loader />
    }
    return (
        <section className="posts">
            {posts.length > 0
                ?
                <div className="container posts__container">
                  
                    {posts.map((post, index) => (
                        <PostsItem
                            key={`${post._id}-${index}`}
                            postId={post._id}
                            thumbnail={post.thumbnail}
                            category={post.category}
                            description={post.description}
                            title={post.title}
                            authorID={post.creator}
                            createdAt={post.createdAt}
                        />
                    ))}
                </div>
                :
                <h2 className="center">No posts found</h2>
            }
        </section>
    )
}
