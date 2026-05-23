import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router'
import '../auth.form.scss'
import  {useAuth}  from '../hooks/useAuth.js'
const Login = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth()
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    const result = await handleLogin(email, password)
    if (result.success) {
      navigate("/")
      return
    }
    setError(result.error)
  }
  if(loading){
    return <p>Loading...</p>
  }
  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" onChange={(e)=>{ setEmail(e.target.value)}} name="email" required />
             
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" onChange={(e)=>{ setPassword(e.target.value)}} name="password" required />
          </div>
          <button className='button primary-button' type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p>{error}</p>}
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </main>
  )
}

export default Login;
