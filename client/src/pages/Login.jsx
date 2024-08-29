import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  const changeInputHandler = (e) => {
    setUserData(prevState => {
      return {
        ...prevState, [e.target.name]: e.target.value
      }
    })
  }

  return (
    <section className='login'>
      <div className='container'>
        <h2>Sign in</h2>
        <form className='form login__form'>
          <p className='form__error-message'>This is an error message</p>
          <input type="text" placeholder='email' name='email' value={userData.email}
            onChange={changeInputHandler} />
          <input type="password" placeholder='Password' name='password' value={userData.password}
            onChange={changeInputHandler} autoFocus />

          <button type='submit' className='btn primary'>Sign in</button>
        </form>
        <small>Don't have account? <Link to="/register">Register</Link></small>
      </div>
    </section>
  )
}
