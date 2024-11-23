"use client";
import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = { name, email, message };

    try {
      const response = await fetch('/api/addMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        cache: 'no-store'
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        throw new Error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-3xl tracking-tight font-extrabold text-center text-gray-900 my-10">Contact Us</h2>
      <div className="md:w-[80%] md:mx-auto bg-white rounded-lg">
        <div className="flex flex-col md:flex-row">
          <div className="left-side w-full md:w-1/4 flex flex-col items-center justify-center mb-6 md:mb-0">
            <div className="details mb-4">
              <FaMapMarkerAlt className="text-3xl text-slate-500 mb-2 text-center mx-auto" />
              <div className="topic text-lg font-medium text-center mx-auto">Address</div>
              <div className="text-one text-sm text-gray-500 text-center mx-auto">30 N Gould St Ste R,</div>
              <div className="text-two text-sm text-gray-500 text-center mx-auto">Sheridan, WY 82801</div>
            </div>
            <div className="details mb-4">
              <FaPhone className="text-3xl text-slate-500 mb-2 text-center mx-auto" />
              <div className="topic text-lg font-medium text-center mx-auto">Phone</div>
              <div className="text-one text-sm text-gray-500 text-center mx-auto">+1 307-381-8051</div>
            </div>
            <div className="details mb-4">
              <FaEnvelope className="text-3xl text-slate-500 mb-2 text-center mx-auto" />
              <div className="topic text-lg font-medium text-center mx-auto">Email</div>
              <div className="text-one text-sm text-gray-500 text-center mx-auto">info@Crudbits.com</div>
            </div>
          </div>
          <div className="right-side w-full md:w-3/4 md:ml-8">
            <div className="topic-text text-2xl font-semibold text-slate-500 mb-4">Send Us a Message</div>
            <form onSubmit={handleSubmit}>
              <div className="input-box mb-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-12 border-none outline-none bg-slate-200 rounded-lg p-4"
                  aria-label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input-box mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-12 border-none outline-none bg-slate-200 rounded-lg p-4"
                  aria-label="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-box mb-4">
                <textarea
                  placeholder="Enter your message"
                  className="w-full h-28 border-none outline-none bg-slate-200 rounded-lg p-4"
                  aria-label="Your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="button">
                <button
                  type="submit"
                  className={`bg-slate-500 px-8 w-full py-2 text-white font-bold hover:bg-transparent border-2 border-slate-500 hover:text-slate-500 transition-all block ${loading ? 'cursor-not-allowed opacity-50' : ''
                    }`}
                >
                  {loading ? (
                    <div>Submitting...</div>
                  ) : (
                    'Send Message'
                  )}
                </button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactComponent;
