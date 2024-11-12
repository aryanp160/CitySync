import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import "../styles/EditEventPage.css";

const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    name: "",
    details: "",
    date: "",
    location: ""
  });
  const user = auth.currentUser;

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const eventData = docSnap.data();
        if (eventData.createdBy !== user.uid) {
          alert("You are not authorized to edit this event.");
          navigate("/home");
        }
        setEvent(eventData);
      } else {
        navigate("/home");
      }
    };

    fetchEvent();
  }, [id, user, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    const eventRef = doc(db, "events", id);

    await updateDoc(eventRef, event);

    navigate(`/event/${id}`);
  };

  return (
    <div className="edit-event-container">
      <h2>Edit Event</h2>
      <form onSubmit={handleSave} className="edit-event-form">
        <label>Event Name</label>
        <input
          type="text"
          value={event.name}
          onChange={(e) => setEvent({ ...event, name: e.target.value })}
          required
        />

        <label>Description</label>
        <textarea
          value={event.details}
          onChange={(e) => setEvent({ ...event, details: e.target.value })}
          required
        ></textarea>

        <label>Date</label>
        <input
          type="date"
          value={event.date}
          onChange={(e) => setEvent({ ...event, date: e.target.value })}
          required
        />

        <label>Location</label>
        <input
          type="text"
          value={event.location}
          onChange={(e) => setEvent({ ...event, location: e.target.value })}
          required
        />

        <button type="submit" className="button-save">Save Changes</button>
      </form>
    </div>
  );
};

export default EditEventPage;