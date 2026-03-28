import React from "react"
import styles from "./Navbar.module.css"
import { Link, useNavigate } from "react-router-dom"
function Navbar() {
  const navigate = useNavigate()
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.logo} onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          ChronoLux
        </div>
        <div className={styles["nav-links"]}>
          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
