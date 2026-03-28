import React from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./AdminNavbar.module.css"

function AdminNavbar({ setToken }) {
  const navigate = useNavigate()
  const path = window.location.pathname
  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("admin")
    setToken(null)
    navigate("/admin/login")
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>CHRONOLUX &nbsp;&nbsp;ADMIN</div>

      <div className={styles.links}>
        <Link
          to="/admin/dashboard"
          className={path === "/admin/dashboard" ? styles.active : ""}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/add-watch"
          className={path === "/admin/add-watch" ? styles.active : ""}
        >
          Add Watch
        </Link>
        <Link
          to="/admin/profile"
          className={path === "/admin/profile" ? styles.active : ""}
        >
          Profile
        </Link>
        <h1 onClick={handleLogout}>Logout</h1>
      </div>
    </nav>
  )
}

export default AdminNavbar
