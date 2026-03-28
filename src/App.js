import React from "react"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Home/Home"
import About from "./Components/About/About"
import Contact from "./Components/Contact/Contact"
import SingleWatch from "./Components/SingleWatch/SingleWatch"
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/watch/:id" element={<SingleWatch />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
