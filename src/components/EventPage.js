import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { auth, db, onAuthStateChanged } from "../firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion, deleteDoc } from "firebase/firestore";
import "../styles/EventPage.css";

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [userName, setUserName] = useState(""); // Name input for RSVP
  const [attendees, setAttendees] = useState([]);
  const [user, setUser] = useState(null); // Local user state

  const commentsEndRef = useRef(null); // Reference for the end of the comments list

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const eventData = docSnap.data();
        setEvent(eventData);

        if (user) {
          setIsCreator(eventData.createdBy === user.uid);
          setIsRSVPed(eventData.attendees?.some((att) => att.uid === user.uid));
        }

        setComments(eventData.comments || []);
        setAttendees(eventData.attendees || []);
      } else {
        navigate("/");
      }
    };

    fetchEvent();
  }, [id, user, navigate]);

  useEffect(() => {
    // Scroll to the bottom of the comments section when comments change
    if (commentsEndRef.current) {
      commentsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments]); // Triggered when comments change

  const handleRSVP = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (user && !isRSVPed && userName.trim()) {
      const eventRef = doc(db, "events", id);
      await updateDoc(eventRef, {
        attendees: arrayUnion({ uid: user.uid, name: userName }),
      });
      setAttendees((prev) => [...prev, { uid: user.uid, name: userName }]);
      setIsRSVPed(true);
    }
  };

  const handleDeleteEvent = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      await deleteDoc(doc(db, "events", id));  // Delete the event
      navigate("/");  // Redirect to the home page after deletion
    }
  };

  const handleEditEvent = () => {
    navigate(`/edit-event/${id}`);
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      const updatedComments = comments.filter((comment) => comment.id !== commentId);
      await updateDoc(doc(db, "events", id), { comments: updatedComments });
      setComments(updatedComments);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (newComment.trim()) {
      // Use "You" for logged-in user comments
      const commentData = { 
        id: Date.now(), 
        uid: user.uid, 
        text: newComment, 
        name: "You" // For the logged-in user
      };
      const updatedComments = [...comments, commentData];
      await updateDoc(doc(db, "events", id), { comments: updatedComments });
      setComments(updatedComments);
      setNewComment("");
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div className="event-detail-container">
      <div className="event-info">
        <div className="event-tile">
          <h1 className="event-title">{event.name}</h1>
          <p className="event-date">Date: {event.date}</p>
          <p className="event-location">Location: {event.location}</p>
          <p className="event-details">{event.details}</p>

          {/* RSVP Section */}
          {!isCreator && !isRSVPed && (
            <div className="rsvp-section">
              <input
                type="text"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <button onClick={handleRSVP} className="button-rsvp">RSVP to Event</button>
            </div>
          )}

          {/* Event creator options */}
          {isCreator && (
            <div className="event-actions">
              <button onClick={handleEditEvent} className="button-edit">Edit Event</button>
              <button onClick={handleDeleteEvent} className="button-delete">Delete Event</button>
            </div>
          )}

          {/* Show the number of RSVPs */}
          <p className="attendee-count">Total Attendees: {attendees.length}</p>

          {/* Display list of RSVP'd users only to the event creator */}
          {isCreator && attendees.length > 0 && (
            <div className="attendees-list">
              <h4>RSVP'd Attendees:</h4>
              <ul>
                {attendees.map((attendee) => (
                  <li key={attendee.uid}>{attendee.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h3>Comments</h3>
        <div className="comments-list">
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>
                  {/* Display "You" for logged-in user's comment, else show their name */}
                  {comment.uid === user?.uid ? "You" : comment.name}:
                </strong>
                {comment.uid === user?.uid || isCreator ? (
                  <button onClick={() => handleDeleteComment(comment.id)} className="delete-comment-btn">
                    Delete
                  </button>
                ) : null}
              </div>
              <div className="comment-text">{comment.text}</div>
            </div>
          ))}
        </div>

        {/* Add New Comment */}
        {user && (
          <div className="add-comment">
            <input
              type="text"
              placeholder="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={handleCommentSubmit} className="button-submit-comment">Submit Comment</button>
          </div>
        )}

        {/* Scroll to the bottom of the comment section */}
        <div ref={commentsEndRef} />
      </div>
    </div>
  );
};

export default EventPage;
