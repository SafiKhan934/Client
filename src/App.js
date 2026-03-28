import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AdminDashboard from "./Components/Admin/AdminDashboard"
import AddWatch from "./Components/Admin/AddWatch"
import EditWatch from "./Components/Admin/EditWatch"
import Profile from "./Components/Admin/Profile"
import AuthPage from "./Components/Admin/AuthPage"
import AdminNavbar from "./Components/Admin/AdminNavbar"
import ProtectedRoute from "./Components/Admin/ProtectedRoute"
import { useState } from "react"

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || null)

  const handleLogin = (newToken) => {
    localStorage.setItem("adminToken", newToken)
    setToken(newToken)
  }

  return (
    <div className="App">
      <BrowserRouter>
        {token && <AdminNavbar setToken={setToken} />}

        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AuthPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/add-watch"
            element={
              <ProtectedRoute>
                <AddWatch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/edit-watch/:id"
            element={
              <ProtectedRoute>
                <EditWatch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/login"
            element={
              token ? (
                <Navigate to="/admin/dashboard" replace />
              ) : (
                <AuthPage onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App