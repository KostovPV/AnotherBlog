const User = require('../models/userModel');
const HttpError = require('../models/errorModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const { error } = require('console');

//=====================  REGISTER NEW USER =====================//
//POST: api/users/register
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (!name || !email || !password || !password2) {
            return next(new HttpError('Fill in all fields', 422))
        }
        const newEmail = email.toLowerCase();
        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) {
            return next(new HttpError("Email already exists", 422));
        }
        if ((password.trim()).length < 6) {
            return next(new HttpError("Password should be atleast 6 sharacters", 422));
        }
        if (password != password2) {
            return next(new HttpError("Password should match", 422));
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hashedPass });
        res.status(201).json(`New user ${newUser.email} registered`);

    } catch (error) {
        return next(new HttpError("User regiostration failed.", 422))
    }

}

//=====================  Log in registered user =====================//
//POST: api/users/login
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new HttpError("Fill in allo fields", 422));
        }
        const newEmail = email.toLowerCase();
        const user = await User.findOne({ email: newEmail });
        if (!user) {
            return next(new HttpError("Invalid credentials.", 422))
        }

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) {
            return next(new HttpError("Invalid credentials.", 422))
        }

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ token, id, name });

    } catch (error) {
        return next(new HttpError("Login failed. Please check yiur credentials", 422))
    }
}

//=====================  User Profile =====================//
//POST: api/users/:id
//Protected
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) {
            return next(new HttpError("User not found", 404))
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new HttpError(error))
    }
}

//===================== Change User Avataar =====================//
//POST: api/users/change-avatar
//Protected
//Reminder for dummy engineers - installed fileupload package to handle the request
// const changeAvatar = async (req, res, next) => {
//     try {
//         if (!req.files.avatar) {
//             return next(new HttpError("Please choose an image", 422))
//         }

//         // find usr from database
//         const user = await User.findById(req.user.id);
//         //delete old avatar if exists
//         if (user.avatar) {
//             fs.unlink(path.join(__dirname, "..", 'uploads', user.avatar), (err) => {
//                 if (err) {
//                     return next(new HttpError(err))
//                 }
//             })
//         }
//         const { avatar } = req.files;
//         //check the file size
//         if (avatar.size > 500000) {
//             return next(new HttpError("Profile picture it too big. Must be less than 500kb"), 422)
//         }
//         let fileName;
//         fileName = avatar.name;
//         let splittedFileName = fileName.split('.');
//         let newFileName = splittedFileName[0] + uuid() + '.' + splittedFileName[splittedFileName.length - 1];
//         avatar.mv(path.join(__dirname, '..', 'uploads', newFileName), async (err) => {
//             if (err) {
//                 return next(new HttpError(err))
//             }
//             const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFileName }, { new: true });
//             if (!updatedAvatar) {
//                 return next(new HttpError("Avatar could't be changed", 422))
//             }
//             res.status(200).json(updatedAvatar);
//         })
//     } catch (error) {
//         return next(new HttpError(error))
//     }
// }

const changeAvatar = async (req, res, next) => {
    try {
        if (!req.files || !req.files.avatar) {
            return next(new HttpError("Please choose an image", 422));
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new HttpError("User not found", 404));
        }

        // Delete old avatar if exists
        if (user.avatar) {
            const oldAvatarPath = path.join(__dirname, "..", 'uploads', user.avatar);
            fs.unlink(oldAvatarPath, (err) => {
                if (err && err.code !== 'ENOENT') {
                    console.error(`Failed to delete old avatar: ${err.message}`);
                    // Don't return a response here, let the flow continue
                }
            });
        }

        const { avatar } = req.files;
        if (avatar.size > 500000) {
            return next(new HttpError("Profile picture is too big. Must be less than 500KB", 422));
        }

        const fileName = `${uuid()}-${avatar.name}`;
        const uploadPath = path.join(__dirname, '..', 'uploads', fileName);

        avatar.mv(uploadPath, async (err) => {
            if (err) {
                return next(new HttpError("Failed to upload avatar", 500));
            }

            // Update the user's avatar in the database
            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: fileName }, { new: true });
            if (!updatedAvatar) {
                return next(new HttpError("Avatar couldn't be changed", 500));
            }

            return res.status(200).json(updatedAvatar);
        });
    } catch (error) {
        return next(new HttpError("An error occurred while changing the avatar", 500));
    }
};


//===================== Edit User Details =====================//
//POST: api/users/edit-user
//Protected
const editUser = async (req, res, next) => {
    try {
        const { name, email, currentPassword,newPassword,  confirmNewPassword} = req.body;
        if( !name || !email || !currentPassword || !newPassword) {
            return next( new HttpError("Fill in all fields", 422))
        }
        // get user form database
        const user = await User.findById(req.user.id);
        if(!user) {
            return next( new HttpError("User not found", 403))
        }
        // Check if hte new email doesn't already exist
        const emailExists = await User.findOne({email});
        if(emailExists && (emailExists._id != req.user.id)) {
            return next (new HttpError(" Email already exists.", 422))
        };
        // compare current passwort with the db password
        const validatePassword = await bcrypt.compare(currentPassword, user.password);
        if(!validatePassword) {
            return next(new HttpError("Invalid current password", 422));
        }
        //compare new passwords
        if(newPassword!== confirmNewPassword){
            return next(new HttpError("Pasword and confirm password doesn't match", 422))
        }
        //hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(newPassword, salt);

        // update user info in database
        const newInfo = await User.findByIdAndUpdate(req.user.id, {name, email, password: hashedPass, }, {new: true})
        res.status(200).json(newInfo);
    } catch (error) {
        return next(new HttpError(error))
    }
}

//===================== Get Authors =====================//
//POST: api/users/authors
//UnProtected
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors);
    } catch (error) {
        return next(new HttpError(error))
    }
}


module.exports = { registerUser, loginUser, getUser, changeAvatar, editUser, getAuthors }