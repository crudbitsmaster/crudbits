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
        src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2831.1677966364346!2d-106.95490339999999!3d44.7977689!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1739487464422!5m2!1sen!2sus"
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
