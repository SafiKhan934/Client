import React, { useEffect, useState, useCallback } from "react"
import { useParams } from "react-router-dom"
import styles from "./EditWatch.module.css"

function EditWatch() {
  const { id } = useParams()

  const [form, setForm] = useState({
    name: "",
    brand: "",
    originalPrice: "",
    discountPrice: "",
    description: "",
    newImage: "",
  })
  const [existingImage, setExistingImage] = useState(null)
  const [loading, setLoading] = useState(true)
  const [updating, setupdating] = useState(false)

  const fetchWatchData = useCallback(() => {
    fetch(`${process.env.REACT_APP_API_URL}/watches/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch watch data")
        return res.json()
      })
      .then((data) => {
        const watch = data.data
        if (!watch) throw new Error("Watch not found")
        setForm({
          name: watch.name,
          brand: watch.brand,
          originalPrice: watch.price.original,
          discountPrice: watch.price.discount,
          description: watch.description,
          newImage: "",
        })
        setExistingImage(watch.image)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Fetch error:", err)
        alert("Error loading watch details. Please try again.")
        setLoading(false)
      })
  }, [id])

  // Fetch existing watch data
  useEffect(() => {
    fetchWatchData()
  }, [fetchWatchData])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleNewImage = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const base64Image = await convertToBase64(file)
      setForm((prev) => ({ ...prev, newImage: base64Image }))
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      name: form.name,
      brand: form.brand,
      description: form.description,
      price: {
        original: form.originalPrice,
        discount: form.discountPrice,
      },
    }

    if (form.newImage) {
      payload.image = form.newImage
    }
    setupdating(true)
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/watches/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      const data = await res.json()
      if (res.ok && data.success) {
        alert("Watch updated successfully!")
        fetchWatchData()
      } else {
        alert(data.message || "Failed to update watch.")
      }
    } catch (err) {
      console.error("Update error:", err)
      alert("An error occurred during update. Please try again.")
    } finally {
      setupdating(false)
    }
  }

  if (loading) return <div className={styles.loading}>Loading watch...</div>

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Edit Watch</h2>

        <input
          type="text"
          name="name"
          placeholder="Watch Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={form.originalPrice}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          value={form.discountPrice}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />

        {/* Existing Image */}
        <div className={styles.imageSection}>
          <h4>Current Image:</h4>
          <div className={styles.preview}>
            {existingImage && (
              <div className={styles.imgWrapper}>
                <img
                  src={existingImage?.url}
                  alt="watch"
                  className={styles.previewImg}
                />
              </div>
            )}
          </div>
        </div>

        {/* New Image Input */}
        <div className={styles.fileButtons}>
          <label className={styles.fileLabel}>
            Change Image
            <input
              type="file"
              accept="image/*"
              onChange={handleNewImage}
              className={styles.fileInput}
            />
          </label>
        </div>

        {/* Preview new image */}
        {form.newImage && (
          <div className={styles.preview}>
            <img
              src={form.newImage}
              alt="new-preview"
              className={styles.previewImg}
            />
          </div>
        )}

        <button type="submit" className={styles.submitBtn}>
          {updating ? "Updating..." : "Update Watch"}
        </button>
      </form>
    </div>
  )
}

export default EditWatch
