import React, { useState } from "react";
import api from "../api";

const LeadPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/api/leads", { name, contact })
      .then((res) => {
        console.log(res.data);
        setShowPopup(false);
        alert("Thank you for submitting your information!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="lead-popup">
      <button onClick={() => setShowPopup(true)}>Click Here</button>
      {showPopup && (
        <div className="popup">
          <form onSubmit={handleSubmit}>
            <h3>Enter your details</h3>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Contact:</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LeadPopup;
