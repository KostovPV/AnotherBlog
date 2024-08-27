

import { useState } from "react";
import Thumbnail1 from "../images/blog1.jpg";
import Thumbnail2 from "../images/blog2.jpg";
import Thumbnail3 from "../images/blog3.jpg";
import Thumbnail4 from "../images/blog4.jpg";
import PostsItem from "./PostsItem";

const DUMMY_POSTS = [
    {
        id: '1',
        thumbnail: Thumbnail1,
        category: 'educaion',
        title: "Thitle for the fist post",
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus laudantium laboriosam facere maxime esse voluptas veritatis aperiam dolores nemo magnam nisi obcaecati nobis voluptatum deleniti vel nostrum, tempore, odio expedita necessitatibus veniam doloremque cumque. Velit minima exercitationem nihil quibusdam minus non explicabo suscipit saepe temporibus recusandae. Sed rerum quidem atque.',
        authorId: 1
    },
    {
        id: '2',
        thumbnail: Thumbnail2,
        category: 'buisiness',
        title: "Thitle for the second post",
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus laudantium laboriosam facere maxime esse voluptas veritatis aperiam dolores nemo magnam nisi obcaecati nobis voluptatum deleniti vel nostrum, tempore, odio expedita necessitatibus veniam doloremque cumque. Velit minima exercitationem nihil quibusdam minus non explicabo suscipit saepe temporibus recusandae. Sed rerum quidem atque.',
        authorId: 2
    },
    {
        id: '3',
        thumbnail: Thumbnail3,
        category: 'high-life',
        title: "Thitle for the three post",
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus laudantium laboriosam facere maxime esse voluptas veritatis aperiam dolores nemo magnam nisi obcaecati nobis voluptatum deleniti vel nostrum, tempore, odio expedita necessitatibus veniam doloremque cumque. Velit minima exercitationem nihil quibusdam minus non explicabo suscipit saepe temporibus recusandae. Sed rerum quidem atque.',
        authorId: 3
    },
    {
        id: '4',
        thumbnail: Thumbnail4,
        category: 'sports',
        title: "Thitle for the fist post",
        desc: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus laudantium laboriosam facere maxime esse voluptas veritatis aperiam dolores nemo magnam nisi obcaecati nobis voluptatum deleniti vel nostrum, tempore, odio expedita necessitatibus veniam doloremque cumque. Velit minima exercitationem nihil quibusdam minus non explicabo suscipit saepe temporibus recusandae. Sed rerum quidem atque.',
        authorId: 4
    }

]

export default function Posts() {
    const [posts, setPosts] = useState(DUMMY_POSTS);
    return (
        <section className="posts">
            <div className="container posts__container">
                {posts.map(({ id, thumbnail, category, title, desc, authorId }) => (
                    <PostsItem key={id} postId={id} thumbnail={thumbnail} category={category} desc={desc} title={title} authorId={authorId} />
                ))}
            </div>
        </section>
    )
}
