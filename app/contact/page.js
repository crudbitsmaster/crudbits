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
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.1675211951597!2d-106.95956382146196!3d44.79777451373382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a655555%3A0xc8c9628401afe29a!2sFHIRGo!5e0!3m2!1sen!2s!4v1729869651641!5m2!1sen!2s"
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
