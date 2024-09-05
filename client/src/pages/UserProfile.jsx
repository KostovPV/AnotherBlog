import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { UserContext } from '../context/userContext';
import axios from 'axios';

export default function UserProfile() {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const { currentUser } = useContext(UserContext);
  const token = currentUser.token;
  const [error, setError] = useState('');
  const [isAvatarTouched, steIsAatarTouched] = useState(false);
  
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${currentUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true // This is used if you need cookies, not for tokens
      });
      const { name, email, avatar } = (await response).data;
      setName(name);
      setEmail(email);
      setAvatar(avatar);
    }
    getUser();
  }, [])

  const changeAvatarHandler = async () => {
    steIsAatarTouched(false);
    try {
      const postData = new FormData();
      postData.set('avatar', avatar);
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/change-avatar`, postData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      })
      
      setAvatar(response?.data.avatar)
    } catch (error) {

    };
  }

  // const updateUserDetails = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const userData = new FormData();
  //     userData.set('name', name);
  //     userData.set('email', email);
  //     userData.set('currentPassword', currentPassword);
  //     userData.set('newPassword', newPassword);
  //     userData.set('confirmNewPassword', confirmNewPassword);

  //     const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/edit-user`, userData, { withCredentials: true, headers: { Authorization: `Bearer ${token}` } });
  //     if (response.status == 200) {
  //       //log out user
  //       Navigate('/logout');
  //     }
  //   } catch (error) {
  //     setError(error.response.data.message);

  //   }
  // }
  
  const updateUserDetails = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currentPassword', currentPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);
  
      const response = await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/edit-user`, userData, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` }
      });
     
      
  
      if (response.status === 200) {
        // Log out the user after successful update
        navigate('/logout');
      }
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  
  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/${currentUser.id}`} className='btn'>My posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={`${import.meta.env.VITE_ASSETS_URL}/uploads/${avatar}`} alt="avatar-image" />
            </div>
            {/* Form for avatar update */}
            <form className="avatar__form">
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg" />
              <label htmlFor="avatar" onClick={() => steIsAatarTouched(true)}><FaEdit /></label>
            </form>
            {isAvatarTouched && <button className='profile__avatar-btn' onClick={changeAvatarHandler}><FaCheck /></button>}
          </div>
          <h1>{currentUser.name}</h1>

          {/* form to update user details */}
          <form className="form profile__form" onSubmit={updateUserDetails}>
            {error && <p className='form__error-message'>{error}</p>}
            <input type="text" placeholder='Full name' value={name} onChange={e => setName(e.target.value)} />
            <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder='Current password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
            <input type="password" placeholder='New password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            <input type="password" placeholder='Confirm new password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} />
            <button type='submit' className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}
