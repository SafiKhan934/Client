import React, { useState } from "react"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"

function AuthPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        localStorage.setItem("adminToken", data.token)
        localStorage.setItem("admin", JSON.stringify(data.user))
        navigate("/admin/dashboard")
        onLogin(data.token)
      } else {
        alert(data.message || "Login failed. Please check your credentials.")
      }
    } catch (err) {
      console.error("Login error:", err)
      alert("An error occurred during login. Please try again.")
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        alert("Signup successful! Please login.")
        setIsLogin(true)
      } else {
        alert(data.message || "Signup failed. Please try again.")
      }
    } catch (err) {
      console.error("Signup error:", err)
      alert("An error occurred during signup. Please try again.")
    }
  }

  return (
    <div className={styles.container}>
      <form
        className={styles.loginBox}
        onSubmit={isLogin ? handleLogin : handleSignup}
      >
        <h2 className={styles.title}>{isLogin ? "Admin Login" : "Signup"}</h2>

        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles.button}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          style={{
            color: "#f1dba6",
            textAlign: "center",
            marginTop: "15px",
            cursor: "pointer",
          }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Signup"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  )
}

export default AuthPage
