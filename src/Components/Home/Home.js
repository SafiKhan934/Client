import React, { useEffect, useState } from "react"
import styles from "./Home.module.css"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  const [watches, setWatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/watches`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch watches")
        return res.json()
      })
      .then((data) => {
        setWatches(data.data || [])
        setLoading(false)
      })
      .catch((err) => {
        console.error("Home fetch error:", err)
        alert("Unable to load watches. Please try again later.")
        setLoading(false)
      })
  }, [])

const trimDescription=(text, wordLimit = 10)=>{
  const words = text.split(" ");

  if (words.length <= wordLimit) {
    return text;
  }
  return words.slice(0, wordLimit).join(" ") + "...";
}
  if (loading) {
    return (
      <div className={styles.loading}>
        <p>Loading watches...</p>
      </div>
    )
  }

  return (
    <div className={styles.home}>
      <div className={styles['watch-grid']}>
        {watches.map((watch) => (
          <div
            className={styles['watch-card']}
            key={watch._id}
            onClick={() => {
              navigate(`/watch/${watch._id}`)
            }}
          >
            <img
              src={watch.image?.url}
              alt={watch.name}
              className={styles['watch-image']}
            />

            <div className={styles['watch-info']}>
              <h3>{watch.name}</h3>
              <p className={styles.brand}>{watch.brand}</p>

              <div className={styles.price}>
                <span className={styles.original}>PKR{watch.price.original}</span>
                <span className={styles.discount}>PKR{watch.price.discount}</span>
              </div>

              <p className={styles.description}>{trimDescription(watch.description, wordLimit = 10)}</p>

              <button className={styles.btn}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
