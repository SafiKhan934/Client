import React, { useState, useEffect } from "react"
import styles from "./Profile.module.css"

function Profile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: "", type: "" })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        const data = await response.json()
        if (response.ok && data.success) {
          setFormData((prev) => ({
            ...prev,
            name: data.user.name,
            email: data.user.email,
          }))
        } else {
          console.error("Profile fetch error:", data.message)
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: "", type: "" })

    if (formData.password && formData.password !== formData.confirmPassword) {
      setMessage({ text: "Passwords do not match", type: "error" })
      setLoading(false)
      return
    }

    const payload = {
      name: formData.name,
      email: formData.email,
    }
    if (formData.password) {
      payload.password = formData.password
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (data.success) {
        setMessage({ text: "Profile updated successfully!", type: "success" })
        // Update local storage if name/email changed
        const currentAdmin = JSON.parse(localStorage.getItem("admin"))
        localStorage.setItem("admin", JSON.stringify({ ...currentAdmin, name: data.user.name, email: data.user.email }))
        // Refresh local user state to update navbar
        window.dispatchEvent(new Event("storage")) 
      } else {
        setMessage({ text: data.message || "Failed to update profile", type: "error" })
      }
    } catch (error) {
      setMessage({ text: "An error occurred. Please try again.", type: "error" })
      console.error("Update error:", error)
    } finally {
      setLoading(false)
      setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }))
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Admin Profile</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>New Password (leave blank to keep current)</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>

          {message.text && (
            <div className={`${styles.message} ${styles[message.type]}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Profile
