import { useState } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../images/avatar16.jpg';
import { FaEdit } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';

export default function UserProfile() {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/myposts/sdfsdf`} className='btn'>My posts</Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img src={avatar} alt="avatar-image" />
            </div>
            {/* Form for avatar update */}
            <form className="avatar__form">
              <input type="file" name="avatar" id="avatar" onChange={e => setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg" />
              <label htmlFor="avatar"><FaEdit /></label>
            </form>
            <button className='profile__avatar-btn'><FaCheck /></button>
          </div>
          <h1>Current User Name</h1>

          {/* form to update user details */}
          <form className="form profile__form">
            <p className='form__error-message'>
                This is an error message
            </p>
            <input type="text" placeholder='Full name' onChange={e => setName(e.target.value)}/>
            <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder='Current password' onChange={e => setPassword(e.target.value)}/>
            <input type="password" placeholder='New password' onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder='Confirm new password' onChange={e => setConfirmNewPassword(e.target.value)}/>
         <button type='submit' className='btn primary'>Update details</button>
          </form>
        </div>
      </div>
    </section>
  )
}
