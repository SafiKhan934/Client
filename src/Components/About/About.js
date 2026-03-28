import React from "react"
import styles from "./About.module.css"

function About() {
  return (
    <div className={styles.about}>
      <h1>About ChronoLux</h1>

      <p>
        At ChronoLux, we believe that a watch is more than just a timepiece — it
        reflects style, precision, and personality.
      </p>

      <p>
        Our mission is to provide high-quality, elegant, and reliable watches
        that suit every occasion. Whether you prefer a classic design or a
        modern look, ChronoLux offers carefully selected timepieces that combine
        craftsmanship with affordability.
      </p>

      <p>
        Our watches are imported from Dubai 🇦🇪, ensuring premium quality and
        contemporary international designs. Each timepiece is built with
        durability in mind, featuring water-resistant 💧 construction for
        reliable everyday use.
      </p>

      <h3>We are committed to:</h3>

      <ul>
        <li>Delivering premium-quality imported watches</li>
        <li>Offering modern and timeless designs</li>
        <li>Ensuring durability with water-resistant features</li>
        <li>Providing competitive and affordable pricing</li>
        <li>Maintaining excellent customer service</li>
      </ul>

      <p>
        Every product at ChronoLux is selected with attention to detail,
        ensuring our customers receive quality they can trust.
      </p>

      <h2>ChronoLux – Timeless Elegance on Your Wrist.</h2>

      <p>
        Contact us on{" "}
        <a
          href="https://wa.me/923XXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>{" "}
        for orders and inquiries.
      </p>
    </div>
  )
}

export default About
