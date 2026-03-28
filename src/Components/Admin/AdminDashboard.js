import React, { useEffect, useState } from "react"
import styles from "./AdminDashboard.module.css"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {
  const navigate = useNavigate()
  const [watches, setWatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/watches`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch watches")
        return res.json()
      })
      .then((data) => {
        setWatches(data.data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err)
        alert("Error loading watches. Please check your connection or login again.")
        setLoading(false)
      })
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this watch?")) {
      fetch(`${process.env.REACT_APP_API_URL}/watches/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete watch")
          return res.json()
        })
        .then(() => {
          setWatches((prev) => prev.filter((w) => w._id !== id))
        })
        .catch((err) => {
          console.error("Delete error:", err)
          alert("Failed to delete watch. Please try again.")
        })
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading watches...</div>
  }

  return (
    <div className={styles.home}>
      {watches.length === 0 ? (
        <div className={styles.loading}>No watches found.</div>
      ) : (
        <div className={styles["watch-grid"]}>
          {watches.map((watch) => (
            <div className={styles["watch-card"]} key={watch._id}>
              <img
                src={watch.image?.url}
                alt={watch.name}
                className={styles["watch-image"]}
              />

              <div className={styles["watch-info"]}>
                <h3>{watch.name}</h3>
                <p className={styles.brand}>{watch.brand}</p>

                <div className={styles.price}>
                  <span className={styles.original}>
                    ${watch.price.original}
                  </span>
                  <span className={styles.discount}>
                    ${watch.price.discount}
                  </span>
                </div>

                <p className={styles.description}>{watch.description}</p>

                <div className={styles["btn-group"]}>
                  <button
                    className={styles.editBtn}
                    onClick={() => navigate(`/admin/edit-watch/${watch._id}`)}
                  >
                    Edit
                  </button>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(watch._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
