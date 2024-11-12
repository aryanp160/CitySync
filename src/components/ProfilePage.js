import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig"; // Make sure to import Firebase correctly
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import "../styles/ProfilePage.css"; // Ensure you have a CSS file for custom styles

const ProfilePage = () => {
  const [rsvpedEvents, setRsvpedEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [user, setUser] = useState(null); // Store user object here
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login"); // Redirect to login page if user is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription on component unmount
  }, [navigate]);

  // Fetch events once user data is available
  useEffect(() => {
    if (user) {
      const fetchEvents = async () => {
        const eventsSnapshot = await getDocs(collection(db, "events"));
        const eventsList = eventsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        setRsvpedEvents(
          eventsList.filter((event) =>
            event.attendees?.some((attendee) => attendee.uid === user.uid)
          )
        );

        setCreatedEvents(
          eventsList.filter((event) => event.createdBy === user.uid)
        );
      };

      fetchEvents();
    }
  }, [user]); // Fetch events when user state changes

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  // Check if the user is logged in
  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <h2>Welcome to Your Profile, {user.displayName || user.email}</h2>

      <button onClick={handleLogout} className="logout-button">Logout</button>

      <div className="profile-section">
        <h3>Your RSVP'd Events</h3>
        {rsvpedEvents.length > 0 ? (
          <div className="events-grid">
            {rsvpedEvents.map((event) => (
              <div
                key={event.id}
                className="event-tile"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <h3 className="event-name">{event.name}</h3>
                <p className="event-details">{event.details.substring(0, 100)}...</p>
                <p className="event-location">{event.location} - {event.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No RSVP'd events to display.</p>
        )}
      </div>

      <div className="profile-section">
        <h3>Your Created Events</h3>
        {createdEvents.length > 0 ? (
          <div className="events-grid">
            {createdEvents.map((event) => (
              <div
                key={event.id}
                className="event-tile"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <h3 className="event-name">{event.name}</h3>
                <p className="event-details">{event.details.substring(0, 100)}...</p>
                <p className="event-location">{event.location} - {event.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No created events to display.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
