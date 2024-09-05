import React, { useEffect, useState,  } from 'react'
import PostsItem from '../components/PostsItem';
import Loader from '../components/Loader';
import { useParams } from 'react-router-dom';
import axios  from 'axios';
export default function CategoryPosts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const {category} = useParams();

  useEffect(() => {
      const fetchPosts = async () => {
          setIsLoading(true);
          try {
              const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/categories/${category}`);
              setPosts(response?.data);
          } catch (err) {
              console.log(err);

          }
          setIsLoading(false)
      }
      fetchPosts();
  }, [category])
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

