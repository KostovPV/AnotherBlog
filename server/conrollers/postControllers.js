const Post = require("../models/postModel");
const User = require("../models/userModel");
const path = require('path');
const fs = require('fs');
const { v4: uuid } = require('uuid')
const HttpError = require('../models/errorModel');

//==================== Get All posts============
//GET: api/posts
//UNProtected
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updatedAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError(error))
    }
}

//================= Get single post =============
//GET: api/posts/:id
//UNProtected
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError('Post was not found', 404))
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError(error))
    }
}

//================= Get posts by category =============
//GET: api/posts/categories/:category
//UNProtected
const getCatPost = async (req, res, next) => {
    try {
        const { category } = req.params;
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
        if (!catPosts) {
            return next(new HttpError('Posts from that category were not found', 404))
        }
        res.status(200).json(catPosts);
    } catch (error) {
        return next(new HttpError(error))
    }
}

//================= Get posts by author =============
//GET: api/posts/users/:id
//UNProtected
const getUsersPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        return next(new HttpError("No post fond for this user Id"))
    }
}

//=================Create post=============
//POST: api/posts
//Protected
const createPost = async (req, res, next) => {
    try {
        let { title, category, description } = req.body;
        if (!title || !category || !description) {
            return next(new HttpError("All fields mut be filled and choose thumbnail", 422));
        }
        const { thumbnail } = req.files;
        //Check if file size is too big
        if (thumbnail.size > 2000000) {
            return next(new HttpError("Thumbnail must be smaller than 2Mb"));
        };
        let fileName = thumbnail.name;
        let splittedFilename = fileName.split('.');
        let newFileName = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1];
        thumbnail.mv(path.join(__dirname, '..', '/uploads', newFileName), async (err) => {
            if (err) {
                return next(new HttpError(err))
            } else {
                const newPost = await Post.create({ title, category, description, thumbnail: newFileName, creator: req.user.id });
                if (!newPost) {
                    return next(new HttpError("Post couldn't be created.", 422))
                }
                // find user and increase post count by 1
                const currentUser = await User.findById(req.user.id);
                const userPostCount = currentUser.posts + 1;
                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })

                res.status(201).json(newPost);
            }
        })
    } catch (error) {
        return next(new HttpError(error));
    }
}

//=================Edit post=============
//PATCH: api/posts/:id
//Protected
// const editPost = async (req, res, next) => {
//     try {
//         let fileName;
//         let newFilename;
//         let updatedPost;
//         const postId = req.params.id;
//         let { title, category, description } = req.body;
//         // ReactQuill has a pargraph opening and closing tag with 
//         // break tag in between there are 11 characters already in there!!
//         if (!title || !category || description.length < 12) {
//             return next(new HttpError("Fill in all fields.", 422))
//         }
//         if (req.user.id === oldPost.creator) {
//             if (!req.files) {
//                 updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true })
//             } else {
//                 // get old post from the database
//                 const oldPost = await Post.findById(postId);
//                 //delete old thumbnail from uploads
//                 fs.unlink(path.join(__dirname, "..", 'uploads', oldPost.thumbnail), async (err) => {
//                     if (err) {
//                         return next(new HttpError(err))
//                     }

//                 })
//                 // upload new thumbnail
//                 const { thumbnail } = req.files;
//                 if (thumbnail.size > 200000) {
//                     return next(new HttpError('File is too big. Max size is 2Mb'))
//                 }
//                 fileName = thumbnail.name;
//                 let splittedFilename = fileName.split('.');
//                 newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1];
//                 thumbnail.mv(path.join(__dirname, "..", 'uploads', newFilename), async (err) => {
//                     if (err) {
//                         return next(new HttpError(err))
//                     }
//                 })
//                 updatedPost = await Post.findByIdAndUpdate(
//                     postId,
//                     { title, category, description, thumbnail: newFilename },
//                     { new: true }
//                 )
//             }
//             if (!updatedPost) {
//                 return next(new HttpError('Couldn\'t update the post.', 400))
//             }
//             res.status(200).json(updatedPost);
//         }
//     } catch (error) {
//         return next(new HttpError(error))
//     }
// }

const editPost = async (req, res, next) => {
    try {
      let fileName;
      let newFilename;
      let updatedPost;
      const postId = req.params.id;
      let { title, category, description } = req.body;
  
      // Ensure description has content other than Quill's default
      if (!title || !category || description.length < 12) {
        return next(new HttpError("Fill in all fields.", 422));
      }
  
      // Fetch the old post from the database before making updates
      const oldPost = await Post.findById(postId);
      if (!oldPost) {
        return next(new HttpError("Post not found.", 404));
      }
  
      // Check if the user has authorization to edit the post
      if (req.user.id !== oldPost.creator.toString()) {
        return next(new HttpError("You are not authorized to edit this post.", 403));
      }
  
      // Update the post without changing the thumbnail
      if (!req.files) {
        updatedPost = await Post.findByIdAndUpdate(
          postId, 
          { title, category, description }, 
          { new: true }
        );
      } else {
        // If there's a new thumbnail, delete the old one and upload the new one
        const { thumbnail } = req.files;
  
        // Delete the old thumbnail from the server
        try {
          await fs.promises.unlink(path.join(__dirname, "..", 'uploads', oldPost.thumbnail));
        } catch (err) {
          return next(new HttpError(`Error deleting old thumbnail: ${err.message}`, 500));
        }
  
        // Check if the new thumbnail size is within the limit
        if (thumbnail.size > 2000000) {
          return next(new HttpError('File is too big. Max size is 2MB', 422));
        }
  
        // Generate a new filename for the thumbnail
        fileName = thumbnail.name;
        let splittedFilename = fileName.split('.');
        newFilename = `${splittedFilename[0]}-${uuid()}.${splittedFilename[splittedFilename.length - 1]}`;
  
        // Upload the new thumbnail to the uploads folder
        thumbnail.mv(path.join(__dirname, "..", 'uploads', newFilename), async (err) => {
          if (err) {
            return next(new HttpError(`Error uploading new thumbnail: ${err.message}`, 500));
          }
        });
  
        // Update the post with the new thumbnail
        updatedPost = await Post.findByIdAndUpdate(
          postId, 
          { title, category, description, thumbnail: newFilename }, 
          { new: true }
        );
      }
  
      if (!updatedPost) {
        return next(new HttpError('Could not update the post.', 400));
      }
  
      res.status(200).json(updatedPost);
    } catch (error) {
      return next(new HttpError(`Error updating post: ${error.message}`, 500));
    }
  };
  

//=================Delete post=============
//Delete: api/posts/:id
//Protected
// const deletePost = async (req, res, next) => {
//     try {
//         const postId = req.params.id;
//         if (!postId) {
//             return next(new HttpError('Post unavailable', 400))

//         }
//         const post = await Post.findById(postId);
//         const fileName = post?.thumbnail;
//         //delete thumbnail from the uploads folder
//         fs.unlink(path.join(__dirname, "..", "uploads", fileName), async (err) => {
//             if (err) {
//                 return next(new HttpError(err))
//             } else {
//                 await Post.findByIdAndDelete(postId);
//                 // find user and redice post count by 1
//                 const currentUser = await User.findById(req.user.id);
//                 const userPostCount = currentUser?.posts - 1;
//                 await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })
//             }
//         })
//         res.json('Post deleted successfully.')
//     } catch (error) {
//         return next(new HttpError(error))
//     }
// }

const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return next(new HttpError('Post unavailable', 400));
        }

        const post = await Post.findById(postId);
        if (!post) {
            return next(new HttpError('Post not found', 404));
        }

        const fileName = post.thumbnail;
        if (req.user.id == post.creator) {
            // If the post has a thumbnail, delete it from the uploads folder
            if (fileName) {
                try {
                    await fs.promises.unlink(path.join(__dirname, "..", "uploads", fileName));
                } catch (err) {
                    return next(new HttpError(`Error deleting file: ${err.message}`, 500));
                }
            }

            // Delete the post from the database
            await Post.findByIdAndDelete(postId);

            // Find the user and reduce post count by 1
            const currentUser = await User.findById(req.user.id);
            const userPostCount = currentUser.posts - 1;
            await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });

            // Send response after successful deletion
            res.json('Post deleted successfully.');

        } else {
            return next(new HttpError("Post could not be deleted", 403));
        }
    } catch (error) {
        return next(new HttpError(`Error deleting post: ${error.message}`, 500));
    }
}


module.exports = { createPost, getPosts, getPost, getCatPost, getUsersPost, editPost, deletePost }