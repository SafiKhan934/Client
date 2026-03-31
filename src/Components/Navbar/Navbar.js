import React from "react"
import styles from "./Navbar.module.css"
import { Link} from "react-router-dom"
function Navbar() {
  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.logo} style={{ cursor: "pointer" }}>
          <Link to="/"> ChronoLux </Link>
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
