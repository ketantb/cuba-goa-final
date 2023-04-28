import React from 'react'
import { CForm, CFormInput, CCol, CButton, CCardHeader } from '@coreui/react'
import { useState, useEffect } from 'react'
import './Login2.css'
import { useNavigate } from 'react-router'
import axios from "axios";


const Login2 = ({ showLogin, setShowLogin }) => {

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [err, setErr] = useState("")
  const handleLoginForm = (params) => (e) => {
    setLoginForm({ ...loginForm, [params]: e.target.value })
    // console.log(e.target.value)
    setErr("")
  }

  const submitLogin = async (e) => {
    e.preventDefault()
    if (!loginForm.email || !loginForm.password) {
      return setErr("both the fields are required")
    }
    // await axios.post('https://cubagoa-server.onrender.com/login', loginForm)
    await axios.post('https://cuba-goa-server.onrender.com/login', loginForm)
      .then((response) => {
        console.log(response.data)
        // console.log(response.data.username)
        // console.log(response.data.token)
        localStorage.setItem('user-info', JSON.stringify(response.data))
        navigate('/')
      })
      .catch((err) => {
        console.log(err.response)
        setErr(err.response.data.message)
      })
  }

  return (
    <section className='log-in' >
      <form className='login-form' onSubmit={(e) => {
        e.target.preventDefault()
      }}>
        <h3>LOG IN</h3>
        <div>
          <input type='email' className='login-inputs' placeholder='Your Email' onChange={handleLoginForm('email')} />
        </div>
        <div>
          <input type='password' className='login-inputs' placeholder='Password' onChange={handleLoginForm('password')} />
        </div>
        <p className='login-err'>{err}</p>
        <div>
          <button id='login-btn' type='submit' onClick={submitLogin} >Login</button>
        </div>
        <p className="already-have-an-account">
          Don't have an account?
          <span className='regiser-span' onClick={() => setShowLogin(false)}> register</span>
        </p>
      </form>
    </section>
  )
}

export default Login2
