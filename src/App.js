import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import EventPage from "./components/EventPage";
import EventCreatePage from "./components/EventCreatePage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import Navbar from "./components/Navbar";
import ProfilePage from "./components/ProfilePage";
import EventEditPage from "./components/EditEventPage";
import { auth } from "./firebaseConfig"; // import authentication

function App() {
  const location = useLocation();
  const user = auth.currentUser; // Check if a user is logged in
  
  // Define the routes where the navbar should not be displayed
  const hideNavbarRoutes = ['/login', '/signup'];

  return (
    <div className="App">
      {/* Render Navbar only if the current route is not in the hideNavbarRoutes array */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute user={user}><ProfilePage /></ProtectedRoute>} />
        <Route path="/create-event" element={<ProtectedRoute user={user}><EventCreatePage /></ProtectedRoute>} />
        <Route path="/edit-event/:id" element={<ProtectedRoute user={user}><EventEditPage /></ProtectedRoute>} />

        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
