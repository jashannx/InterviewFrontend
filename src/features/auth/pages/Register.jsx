import React from 'react'
import { useNavigate, Link } from 'react-router'
import '../auth.form.scss'
import { useAuth } from '../hooks/useAuth.js'

const Register = () => {
  const navigate = useNavigate();

  const [Username, setUsername] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState("")

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const result = await handleRegister(Username, email, password)

    if (result.success) {
      navigate("/")
      return
    }

    setError(result.error)
  }

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <main>
      <div className="form-container">

        {/* WEBSITE INTRO */}
        <div className="website-intro">
          <h1>InterviewAI</h1>

          <p>
            Create your account and start practicing AI-powered mock
            interviews, resume-based questions, and personalized interview
            preparation.
          </p>
        </div>

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="Username">Username:</label>

            <input
              type="text"
              id="Username"
              name="Username"
              required
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email:</label>

            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password:</label>

            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>

          <button
            className='button primary-button'
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {error && <p>{error}</p>}

        <p>
          Already have an account?
          <Link to="/login"> Login here</Link>
        </p>

      </div>
    </main>
  )
}

export default Register