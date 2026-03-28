import React, { useState } from "react"
import styles from "./AddWatch.module.css"
import { useNavigate } from "react-router-dom"

function AddWatch() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    brand: "",
    originalPrice: "",
    discountPrice: "",
    description: "",
    image: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      const base64Image = await convertToBase64(file)
      setForm((prev) => ({
        ...prev,
        image: base64Image,
      }))
    }
  }

  // Remove image
  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      image: "",
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.image) {
      alert("Please select an image!")
      return
    }
    setLoading(true)

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/watches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          name: form.name,
          brand: form.brand,
          description: form.description,
          price: {
            original: form.originalPrice,
            discount: form.discountPrice,
          },
          image: form.image,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        alert("Watch added successfully!")
        navigate("/admin/dashboard")
      } else {
        alert(data.message || "Failed to add watch.")
      }
    } catch (err) {
      console.error("Add watch error:", err)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }

    setForm({
      name: "",
      brand: "",
      originalPrice: "",
      discountPrice: "",
      description: "",
      image: "",
    })
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Add Watch</h2>

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

        <div className={styles.fileButtons}>
          <label className={styles.fileLabel}>
            Upload Image
            <input
              type="file"
              onChange={handleImageChange}
              className={styles.fileInput}
              accept="image/*"
            />
          </label>
        </div>

        {/* Preview images with delete button */}
        {form.image && (
          <div className={styles.preview}>
            <div className={styles.imgWrapper}>
              <img
                src={form.image}
                alt="preview"
                className={styles.previewImg}
              />
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={removeImage}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Adding..." : "Add Watch"}
        </button>
      </form>
    </div>
  )
}

export default AddWatch
