// src/pages/AboutUs.js
import React from 'react';
import '../styles/AboutUs.css';
import aditiPhoto from '../aditi.jpg'; // Import the image from the same folder as App.js
import arPhoto from '../OIP.jpeg'; // Import the image from the same folder as App.js


const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p className="about-us-intro">
        We’re a team of two creative minds, collaborating to make something amazing at this hackathon!
      </p>
      <div className="team-section">
        <div className="team-member">
          <div className="member-photo-container">
          <img src={arPhoto} alt="Aryan Pathak" className="member-photo" />
          </div>
          <h2>Aryan Pathak</h2>
          <p className="member-role">Lead Developer</p>
          <p>
            Passionate about coding and user-centric design, I’m responsible for bringing our project’s functionality to life. Excited to create a smooth and memorable experience for users!
          </p>
        </div>
        <div className="team-member">
          <div className="member-photo-container">
          <img src={aditiPhoto} alt="Aditi Sharma" className="member-photo" />

          </div>
          <h2>Aditi Sharma</h2>
          <p className="member-role">Designer & Presenter</p>
          <p>
            With a flair for design and an eye for detail, Aditi has crafted our project’s look and feel. She’s also the voice behind our project presentation, ready to showcase our vision to the world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
