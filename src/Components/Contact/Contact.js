import React, { useState } from "react"
import styles from "./Contact.module.css"

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Form Data:", form)

    // yahan API call bhi kar sakte ho
    // fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })

    alert("Message sent successfully!")

    // reset form
    setForm({
      name: "",
      email: "",
      message: "",
    })
  }

  return (
    <div className={styles.contact}>
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit} className={styles["contact-form"]}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Enter your message"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Send Message</button>
      </form>
      <div className={styles.social}>
        <i className="fa-brands fa-whatsapp"></i>
        <i className="fa-brands fa-facebook"></i>
        <i className="fa-brands fa-instagram"></i>
        <i className="fa-brands fa-facebook-messenger"></i>
        <i className="fa-brands fa-tiktok"></i>
      </div>
    </div>
  )
}

export default Contact
