import React from 'react'
import { Link } from 'react-router-dom'
import Avatar from "../images/avatar1.jpg"
export default function PostAuthor() {
    return (
        <Link to={`/posts/user/:id`} className='post__author'>
            <div className="post__author-avatar">
                <img src={Avatar} alt="avatar-image" />
            </div>
            <div className="post__author-details">
                <h5>By: Some good Author</h5>
                <small>Created date</small>
            </div>
        </Link>
    )
}
