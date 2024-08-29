import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {
        ...prevState, [e.target.name]: e.target.value
      }
    })
  }

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
        <form className='form register__form'>
          <p className='form__error-message'>This is an error message</p>
          <input type="text" placeholder='Ful name' name='name' value={userData.name}
            onChange={changeInputHandler} />
          <input type="text" placeholder='email' name='email' value={userData.email}
            onChange={changeInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userData.password}
            onChange={changeInputHandler} />
             <input type="password" placeholder='Confirm password' name='password2' value={userData.password2}
            onChange={changeInputHandler} />
            <button type='submit' className='btn primary'>Register</button>
        </form>
        <small>Already have account? <Link to="/login">Sign in</Link></small>
      </div>
    </section>
  )
}
