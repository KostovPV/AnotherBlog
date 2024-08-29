

import { useState } from "react";
import PostsItem from "./PostsItem";

import { DUMMY_POSTS } from "../data";

export default function Posts() {
    const [posts, setPosts] = useState(DUMMY_POSTS);
    return (
        <section className="posts">
            {posts.length > 0
                ?
                <div className="container posts__container">
                    {posts.map(({ id, thumbnail, category, title, desc, authorId }) => (
                        <PostsItem key={id} postId={id} thumbnail={thumbnail} category={category} desc={desc} title={title} authorId={authorId} />
                    ))}
                </div>
                :
                <h2 className="center">No posts found</h2>
            }
        </section>
    )
}
