import React, { useState, useEffect } from "react"
import styles from "./SingleWatch.module.css"
import { useParams, useNavigate } from "react-router-dom"
import WhatsappButton from "../WhatsappButton/WhatsappButton"

function SingleWatch() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [watch, setWatch] = useState()

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/watches/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch watch details")
        return res.json()
      })
      .then((data) => {
        setWatch(data.data)
      })
      .catch((err) => {
        console.error("SingleWatch fetch error:", err)
        alert("Error loading watch details. Returning to home.")
        navigate("/")
      })
  }, [id, navigate])

  if (!watch) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles["single-watch"]}>
      <div className={styles["image-container"]}>
        <img
          src={watch.image?.url}
          alt={watch.name}
          className={styles["watch-image"]}
        />
      </div>

      <div className={styles["watch-details"]}>
        <h2>{watch.name}</h2>
        <p className={styles.brand}>{watch.brand}</p>

        <div className={styles.price}>
          <span className={styles.original}>${watch.price?.original}</span>
          <span className={styles.discount}>${watch.price?.discount}</span>
        </div>

        <p className={styles.description}>{watch.description}</p>

        {/* Action Buttons */}
        <div className={styles.actions}>
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            Back
          </button>

          <WhatsappButton watch={watch} />
        </div>
      </div>
    </div>
  )
}

export default SingleWatch
