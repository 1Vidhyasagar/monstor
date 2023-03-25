import React, { useState, useEffect } from "react";
import api from "../api";

const SocialIcons = () => {
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    api
      .get("/api/social")
      .then((res) => {
        setSocialLinks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="social-icons">
      {socialLinks.map((link, index) => (
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <i className={`fab fa-${link.platform}`}></i>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
