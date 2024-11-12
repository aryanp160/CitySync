// src/components/HomePage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "../styles/HomePage.css";
import word from '../words.PNG';

const HomePage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterType, setFilterType] = useState("location");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
      setFilteredEvents(eventsList);
    });
    return () => unsubscribe();
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleFilterChange = () => {
    let filtered = [...events];
  
    if (filterType === "location") {
      filtered = events.filter((event) =>
        event.location.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (filterType === "keyword") {
      filtered = events.filter((event) =>
        event.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        event.details.toLowerCase().includes(filterValue.toLowerCase())
      );
    } else if (filterType === "date" && filterValue) {
      try {
        const selectedDate = new Date(filterValue);
        const formattedDate = selectedDate.toISOString().split('T')[0];
  
        filtered = events.filter((event) => {
          if (!event.date) return false; 
          const eventDate = new Date(event.date).toISOString().split('T')[0];
          return eventDate === formattedDate;
        });
      } catch (error) {
        console.error("Date format error:", error);
        filtered = [];
      }
    }
  
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    handleFilterChange();
  }, [filterValue, filterType, events, handleFilterChange]);

  return (
    <div className="main-container">
      <header className="header">
        {/* Replace the text with an image */}
        <img src={word} alt="Aditi Sharma" className="member-photo" />
      </header>

      {/* Filter Section */}
      <div className="filter-section">
        <h3>Filter Events</h3>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select"
        >
          <option value="location">Location</option>
          <option value="keyword">Keyword</option>
          <option value="date">Date</option>
        </select>

        {filterType === "date" ? (
          <input
            type="date"
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="input"
          />
        ) : (
          <input
            type="text"
            placeholder={`Enter ${filterType}`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="input"
          />
        )}
      </div>

      {/* Event Tiles */}
      <div className="home-page">
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-tile">
              <h2 className="event-title">{event.name}</h2>
              <p className="event-subtitle">{event.location} - {event.date}</p>
              <p className="event-preview">{event.details.substring(0, 100)}...</p>
              <button
                onClick={() => navigate(`/event/${event.id}`)}
                className="button-view-details"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
