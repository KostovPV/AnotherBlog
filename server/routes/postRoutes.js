const { Router} = require('express');
const router = Router();

const  {createPost,getPosts,  getPost, getCatPost, getUsersPost, editPost, deletePost} = require('../conrollers/postControllers')
const authMiddleware = require('../middleware/authMiddleware');

// Static routes first
router.get('/', getPosts); // List all posts
router.post('/', authMiddleware, createPost); // Create new post
router.get('/categories/:category', getCatPost); // Get posts by category

// Specific dynamic routes
router.get('/users/:id', getUsersPost); // Get posts by a specific user

// General dynamic routes last
router.get('/:id', getPost); // Get post by ID
router.patch('/:id', authMiddleware, editPost); // Edit post by ID
router.delete('/:id', authMiddleware, deletePost); // Delete post by ID

module.exports = router;