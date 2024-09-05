const { Router} = require('express');
const router = Router();

const {registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors} = require('../conrollers/userController');
const authMiddleware = require('../middleware/authMiddleware');
 
// Static routes first
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-avatar',authMiddleware, changeAvatar); 
router.patch('/edit-user',authMiddleware,  editUser);
router.get('/',  getAuthors);

// Dynamic routes last
router.get('/:id', getUser);
module.exports = router;