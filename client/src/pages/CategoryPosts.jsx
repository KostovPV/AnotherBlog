import React from 'react'
import PostsItem from '../components/PostsItem';

export default function CategoryPosts() {
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
