"use client";

import React, { useEffect, useState } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import Custom404 from "../../not-found";
import ServiceComponent from '@/app/components/ServiceComponent';

const Page = ({ params }) => {
  const { slug } = params;
  const [service, setService] = useState(null);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 600 });

    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/services', { cache: 'no-store' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const filteredService = data.find((e) => e.slug === slug);
        setService(filteredService || null);
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [slug]);

  if (loading) {
    return (
      <div className='fixed bg-white top-0 left-0 flex items-center justify-center h-full w-full overflow-hidden'>
        <div className='loader'></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!service) {
    return <Custom404 />;
  }

  return (
    <div>
      <div
        className="hero max-h-96 h-screen w-full relative overflow-hidden bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: `url(${service.thumbnail})` }}
      >
        <div className='w-full h-full bg-black opacity-50'></div>
        <div className="absolute inset-0 mx-auto text-white flex-col space-y-4 md:w-[60%] w-[80%] h-screen pt-[100px]">
          <h1 className="mt-8 mb-4 text-4xl font-extrabold text-center">{service.title}</h1>
          <p className="text-md text-center">{service.description}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-[90%] mx-auto pt-10">
        {service.para?.map((item, index) => (
          <div
            className="flex flex-col"
            key={item._id}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
          >
            <div
              className="md:w-[40vw] md:min-h-[20vw] min-h-72 w-full bg-cover bg-center mx-auto"
              style={{
                backgroundImage: `url(${service.thumbnail})`,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            />
            <div className="bg-slate-100 border-2 border-slate-300 md:w-[80%] w-[90%] md:px-4 px-2 py-6 relative mx-auto bottom-[100px] flex-grow flex flex-col justify-between space-y-4">
              <span className="text-5xl font-bold text-red-500">{index < 9 ? 0 : ""}{index + 1}</span>
              <h2 className="text-xl font-bold text-slate-600">{item.title}</h2>
              <p className="text-md">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="mt-16 text-3xl tracking-tight font-extrabold text-center text-gray-900">Services</h2>
        <ServiceComponent />
      </div>
    </div>
  );
};

export default Page;
