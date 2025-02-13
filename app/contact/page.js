"use client";
import React, { useState, useEffect } from 'react';
import ContactComponent from '../components/ContactComponent'; // Fixed spelling of 'ContactComponent'

const Contact = () => {
  const [iframeWidth, setIframeWidth] = useState(""); // Initialize with current width

  useEffect(() => {
    setIframeWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d45298.684667677975!2d-106.954903!3d44.797769!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a6d206b%3A0x1887ab0668b2495c!2s30%20N%20Gould%20St%20Suite%20R%2C%20Sheridan%2C%20WY%2082801!5e0!3m2!1sen!2sus!4v1739486744587!5m2!1sen!2sus"
        width={iframeWidth}
        height="450"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <ContactComponent />
    </div>
  );
};
export default Contact;
