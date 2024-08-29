import React, { useState } from 'react'
import { DUMMY_POSTS } from '../data'
import PostsItem from '../components/PostsItem';

export default function AuthorPosts() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    <section className="author-posts">
      {posts.length > 0
        ?
        <div className="container author-post__container">
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
