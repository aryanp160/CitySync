// src/components/CreateEvent.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import "../styles/EventCreatePage.css";

const EventCreatePage = () => {
  const navigate = useNavigate();
  const [eventName, setEventName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add event data to Firestore
      const docRef = await addDoc(collection(db, "events"), {
        name: eventName,
        details: eventDetails,
        date: eventDate,
        location: eventLocation,
        createdBy: user.uid,
        attendees: [], // Initialize empty attendees list
      });

      // Redirect to the newly created event page using the event ID
      navigate(`/event/${docRef.id}`); // docRef.id is the ID of the newly created event
    } catch (error) {
      console.error("Error adding event: ", error);
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit} className="create-event-form">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
        <textarea
          placeholder="Event Details"
          value={eventDetails}
          onChange={(e) => setEventDetails(e.target.value)}
          required
        />
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Event Location"
          value={eventLocation}
          onChange={(e) => setEventLocation(e.target.value)}
          required
        />
        <button type="submit" className="button-primary">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventCreatePage;
